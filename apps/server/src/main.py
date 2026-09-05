import asyncio
import logging
from contextlib import asynccontextmanager

import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .polling import poll_courses, poll_open_sections
from .routers import courses, events
from .state import CourseStore


def configure_logging() -> None:
    logger = logging.getLogger("rusniped")
    logger.setLevel(logging.INFO)
    logger.propagate = False

    if not logger.handlers:
        handler = logging.StreamHandler()
        handler.setFormatter(
            logging.Formatter("%(asctime)s %(levelname)s [%(name)s] %(message)s")
        )
        logger.addHandler(handler)


configure_logging()


@asynccontextmanager
async def lifespan(app: FastAPI):
    store: CourseStore = CourseStore()
    client: httpx.AsyncClient = httpx.AsyncClient(timeout=httpx.Timeout(10.0))

    app.state.store = store

    tasks = [
        asyncio.create_task(poll_courses(store, client)),
        asyncio.create_task(poll_open_sections(store, client)),
    ]

    try:
        yield
    finally:
        for task in tasks:
            task.cancel()

        await asyncio.gather(*tasks, return_exceptions=True)
        await client.aclose()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(courses.router)
app.include_router(events.router)


@app.get("/health")
async def health():
    return {"ok": True}

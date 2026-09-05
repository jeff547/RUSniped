from collections.abc import AsyncIterator
from typing import cast

from fastapi import APIRouter, Request
from fastapi.sse import EventSourceResponse, ServerSentEvent

from ..state import CourseStore

router = APIRouter(tags=["events"])


@router.get("/events", response_class=EventSourceResponse)
async def events(request: Request) -> AsyncIterator[ServerSentEvent]:
    store = cast(CourseStore, request.app.state.store)
    queue = store.subscribe()

    try:
        yield ServerSentEvent(
            event="connected",
            data={"ready": store.open_sections is not None},
        )

        while True:
            await queue.get()  # Receives state.py's internal None ping.

            yield ServerSentEvent(
                event="open-sections-updated",
                data={
                    "updatedAt": (
                        store.open_sections_updated_at.isoformat()
                        if store.open_sections_updated_at
                        else None
                    )
                },
            )
    finally:
        store.unsubscribe(queue)

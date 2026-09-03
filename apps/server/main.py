import httpx
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

RUTGERS_BASE = "https://classes.rutgers.edu"


@app.get("/health")
async def health():
    return {"ok": True}


@app.get("/soc/api/{path:path}")
async def proxy(path: str, request: Request):
    url = f"{RUTGERS_BASE}/soc/api/{path}"
    params = dict(request.query_params)
    async with httpx.AsyncClient() as client:
        try:
            r = await client.get(
                url,
                params=params,
                timeout=10.0,
            )
        except httpx.RequestError as exc:
            raise HTTPException(
                status_code=502,
                detail=f"Upstream request failed: {exc}",
            )
        
    return Response(
        content=r.content,
        status_code=r.status_code,
        media_type=r.headers.get("content-type"),
    )

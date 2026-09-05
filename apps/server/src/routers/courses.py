from typing import cast

from fastapi import APIRouter, HTTPException, Request

from ..state import CourseStore

router = APIRouter(tags=["courses"])


def get_store(request: Request) -> CourseStore:
    return cast(CourseStore, request.app.state.store)


@router.get("/courses")
async def get_courses(request: Request):
    store = get_store(request)

    if store.courses is None:
        raise HTTPException(status_code=503, detail="Course data is loading")

    return {
        "courses": store.courses,
        "updatedAt": store.courses_updated_at,
    }


@router.get("/open-sections")
async def get_open_sections(request: Request):
    store = get_store(request)

    if store.open_sections is None:
        raise HTTPException(status_code=503, detail="Open-section data is loading")

    return {
        "sections": sorted(store.open_sections),
        "updatedAt": store.open_sections_updated_at,
    }

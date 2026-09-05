from typing import Any

import httpx

RUTGERS_BASE_URL = "https://classes.rutgers.edu/soc/api"
FALL_2026 = {
    "year": "2026",
    "term": "7",
    "campus": "NB",
}


async def fetch_courses(client: httpx.AsyncClient) -> list[dict[str, Any]]:
    response = await client.get(
        f"{RUTGERS_BASE_URL}/courses.json",
        params=FALL_2026,
    )
    response.raise_for_status()

    data = response.json()
    if not isinstance(data, list) or not all(
        isinstance(course, dict) for course in data
    ):
        raise ValueError("Rutgers returned an unexpected course payload")

    return data


async def fetch_open_sections(client: httpx.AsyncClient) -> list[str]:
    response = await client.get(
        f"{RUTGERS_BASE_URL}/openSections.json",
        params=FALL_2026,
    )
    response.raise_for_status()

    data = response.json()
    if not isinstance(data, list) or not all(isinstance(index, str) for index in data):
        raise ValueError("Rutgers returned an unexpected open-sections payload")

    return data

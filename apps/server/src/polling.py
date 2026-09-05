import asyncio
import logging

import httpx

from .fetch import fetch_courses, fetch_open_sections
from .state import CourseStore

logger = logging.getLogger("rusniped.polling")

COURSE_POLL_SECONDS = 60 * 60
OPEN_SECTION_POLL_SECONDS = 15

async def poll_courses(store: CourseStore, client: httpx.AsyncClient,) -> None:
    while True:
        try:
            store.set_courses(await fetch_courses(client))
            logger.info("Course catalog refereshed")
        except (httpx.HTTPError, ValueError) as error:
            logger.warning("Course catalog refreshed failed: %s", error)

        await asyncio.sleep(COURSE_POLL_SECONDS)

async def poll_open_sections(
        store: CourseStore,
        client: httpx.AsyncClient,
) -> None:
    while True:
        try:
            open_sections = await fetch_open_sections(client)
            changes = store.set_open_sections(open_sections)


            if changes is None:
                logger.info(
                    "Initial open-section snapshot loaded: %d sections",
                    len(open_sections),
                )
            elif changes.has_changes:
                logger.info(
                    "Availability changed: %d opened, %d closed",
                    len(changes.opened),
                    len(changes.closed),
                )

        except (httpx.HTTPError, ValueError) as error:
            logger.warning("Open sections refresh failed: %s", error)

        await asyncio.sleep(OPEN_SECTION_POLL_SECONDS)

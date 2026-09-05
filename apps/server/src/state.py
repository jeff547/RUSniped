import asyncio
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any


@dataclass(frozen=True)
class sectionChanges:
    opened: frozenset[str]
    closed: frozenset[str]

    @property
    def has_changes(self) -> bool:
        return bool(self.opened or self.closed)


class CourseStore:
    def __init__(self) -> None:
        self.courses: list[dict[str, Any]] | None = None
        self.open_sections: frozenset[str] | None = None

        self.courses_updated_at: datetime | None = None
        self.open_sections_updated_at: datetime | None = None

        # One queue for each browser connected to /events.
        self.subscribers: set[asyncio.Queue[None]] = set()

    def set_courses(self, courses: list[dict[str, Any]]) -> None:
        self.courses = courses
        self.courses_updated_at = datetime.now(timezone.utc)

    def set_open_sections(
        self,
        open_sections: list[str],
    ) -> sectionChanges | None:
        """Save sections and return whether availability changed."""
        latest: frozenset[str] = frozenset(open_sections)

        # First fetch
        if self.open_sections is None:
            self.open_sections = latest
            self.open_sections_updated_at = datetime.now(timezone.utc)
            return None

        changes = sectionChanges(
            opened=latest - self.open_sections,
            closed=self.open_sections - latest,
        )   
        self.open_sections = latest
        self.open_sections_updated_at = datetime.now(timezone.utc)

        if changes.has_changes:
            self.notify_subscribers()

        return changes

    def subscribe(self) -> asyncio.Queue[None]:
        # At most one pending event per client.
        queue: asyncio.Queue[None] = asyncio.Queue(maxsize=1)
        self.subscribers.add(queue)
        return queue

    def unsubscribe(self, queue: asyncio.Queue[None]) -> None:
        self.subscribers.discard(queue)

    def notify_subscribers(self) -> None:
        for queue in self.subscribers.copy():
            if not queue.full():
                queue.put_nowait(None)

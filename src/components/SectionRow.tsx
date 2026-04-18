import clsx from "clsx";
import type { Section } from "../types/course";

type SectionRowProps = {
  section: Section;
};

export function SectionRow({ section }: SectionRowProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <StatusBadge open={section.openStatus} />

      <span className="font-mono text-xs text-stone-400 dark:text-stone-500 w-14 shrink-0">
        #{section.index}
      </span>

      <span className="font-medium w-10 shrink-0 text-stone-700 dark:text-stone-200">
        {section.number}
      </span>

      <span className="text-stone-600 dark:text-stone-300 truncate flex-1">
        {section.instructorsText || "—"}
      </span>

      <MeetingInfo section={section} />
    </div>
  );
}

function StatusBadge({ open }: { open: boolean }) {
  return (
    <span
      className={clsx(
        "inline-block w-16 text-center rounded px-2 py-0.5 text-xs font-semibold shrink-0",
        open
          ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300"
          : "bg-scarlet-100 dark:bg-scarlet-900/40 text-scarlet-800 dark:text-scarlet-300",
      )}
    >
      {open ? "OPEN" : "CLOSED"}
    </span>
  );
}

function MeetingInfo({ section }: { section: Section }) {
  const first = section.meetingTimes[0];
  if (!first) return null;

  if (first.campusName === "ONLINE") {
    return (
      <span className="text-xs text-stone-500 dark:text-stone-400 shrink-0">
        Online
      </span>
    );
  }

  if (first.startTime) {
    return (
      <span className="text-xs text-stone-500 dark:text-stone-400 shrink-0">
        {first.meetingDay} {first.startTime}
      </span>
    );
  }

  return null;
}

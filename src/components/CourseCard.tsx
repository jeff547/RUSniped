import type { Course } from "../types/course";
import { SectionRow } from "./SectionRow.tsx";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  const openCount = course.sections.filter((s) => s.openStatus).length;
  const totalCount = course.sections.length;

  return (
    <article className="rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 hover:border-scarlet-300 dark:hover:border-scarlet-700 transition-colors">
      <header className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-mono text-sm text-scarlet-600 dark:text-scarlet-400 font-semibold">
              {course.courseString}
            </span>
            <h2 className="font-semibold text-stone-900 dark:text-stone-100">
              {course.expandedTitle || course.title}
            </h2>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            {course.subjectDescription} · {course.credits} credits
          </p>
          {course.preReqNotes && (
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-1 italic">
              {course.preReqNotes}
            </p>
          )}
        </div>
        <span className="text-xs text-stone-500 dark:text-stone-400 whitespace-nowrap shrink-0">
          {openCount} / {totalCount} open
        </span>
      </header>

      <div className="mt-3 space-y-1.5 border-t border-stone-100 dark:border-stone-800 pt-3">
        {course.sections.map((section) => (
          <SectionRow key={section.index} section={section} />
        ))}
      </div>
    </article>
  );
}

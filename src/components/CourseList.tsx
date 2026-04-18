import type { Course } from "../types/course";
import { CourseCard } from "./CourseCard";

type CourseListProps = {
  courses: Course[];
};

export function CourseList({ courses }: CourseListProps) {
  if (courses.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 p-12 text-center">
        <p className="text-stone-500 dark:text-stone-400">
          No courses match your filters.
        </p>
        <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
          Try adjusting your search or clearing filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {courses.map((course) => (
        <CourseCard key={course.courseString} course={course} />
      ))}
    </div>
  );
}

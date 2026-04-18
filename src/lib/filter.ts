import type { Course, CourseFilters } from "../types/course";

export function filterCourses(
  courses: Course[],
  filters: CourseFilters,
): Course[] {
  const { search, subjects, openOnly } = filters;
  const searchLower = search.trim().toLowerCase();
  return courses
    .filter((course) => {
      if (subjects.length > 0 && !subjects.includes(course.subject)) {
        return false;
      }

      if (openOnly && !course.sections.some((s) => s.openStatus)) {
        return false;
      }

      if (searchLower) {
        const haystack = [
          course.courseString,
          course.expandedTitle,
          course.title,
          course.subjectDescription,
          ...course.sections.map((s) => s.instructorsText),
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(searchLower)) {
          return false;
        }
      }

      return true;
    })
    .map((course) => {
      if (!openOnly) return course;
      return {
        ...course,
        sections: course.sections.filter((s) => s.openStatus),
      };
    });
}

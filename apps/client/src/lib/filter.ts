import type { Course, CourseFilters } from "@rusniped/shared";
import { isSectionOnline } from "@rusniped/shared";

export function filterCourses(
  courses: Course[],
  filters: CourseFilters,
): Course[] {
  const { search, subjects, coreCodes, openOnly, onlineOnly } = filters;
  const searchLower = search.trim().toLowerCase();

  return courses
    .filter((course) => {
      // Subject Filter
      if (subjects.length > 0 && !subjects.includes(course.subject)) {
        return false;
      }

      // Core Code Filter
      if (coreCodes.length > 0) {
        const courseCoreCodes = new Set(course.coreCodes.map((c) => c.code));
        if (!coreCodes.some((c) => courseCoreCodes.has(c))) return false;
      }

      // Open-Only Filter
      if (openOnly && !course.sections.some((s) => s.openStatus)) {
        return false;
      }

      // Online-Only Filter
      if (onlineOnly && !course.sections.some(isSectionOnline)) {
        return false;
      }

      // Search Filter
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
      let sections = course.sections;
      if (openOnly) sections = sections.filter((s) => s.openStatus);
      if (onlineOnly) sections = sections.filter(isSectionOnline);
      if (sections === course.sections) return course;
      return { ...course, sections };
    });
}

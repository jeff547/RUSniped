import { useMemo } from "react";
import type { Course } from "../types/course";
import { useCourseData } from "./useCourseData";
import { useOpenSections } from "./useOpenSections";

export function useCourses() {
  const courseDataQuery = useCourseData();
  const openSectionsQuery = useOpenSections();

  const courses = useMemo<Course[]>(() => {
    if (!courseDataQuery.data || !openSectionsQuery.data) return [];

    const openSections = new Set(openSectionsQuery.data);

    return courseDataQuery.data.map((course) => ({
      ...course,
      sections: course.sections.map((section) => ({
        ...section,
        openStatus: openSections.has(section.index),
      })),
    }));
  }, [courseDataQuery.data, openSectionsQuery.data]);

  return {
    courses,
    isLoading: courseDataQuery.isLoading || openSectionsQuery.isLoading,
    isError: courseDataQuery.isError || openSectionsQuery.isError,
    error: courseDataQuery.error || openSectionsQuery.error,
    isFetching: openSectionsQuery.isFetching,
    lastUpdated: openSectionsQuery.dataUpdatedAt,
    refetch: () => {
      courseDataQuery.refetch();
      openSectionsQuery.refetch();
    },
  };
}

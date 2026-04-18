import { fetchCourses } from "../api/courseData";
import { useQuery } from "@tanstack/react-query";

export function useCourseData() {
  return useQuery({
    queryKey: ["courseData"],
    queryFn: fetchCourses,
    refetchInterval: 60 * 60 * 1000,
    refetchIntervalInBackground: false,
  });
}

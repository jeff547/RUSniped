import type { Course } from "../types/course";
import { backendUrl } from "./backend";

type CoursesResponse = {
  courses: Course[];
  updatedAt: string | null;
};

export async function fetchCourses(): Promise<CoursesResponse> {
  const response = await fetch(backendUrl("/courses"));

  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.status}`);
  }

  return response.json() as Promise<CoursesResponse>;
}

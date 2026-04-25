import type { Course } from "@rusniped/shared";

const COURSES_URL = "/api/courses.json?year=2026&term=7&campus=NB";

export async function fetchCourses(): Promise<Course[]> {
  console.log("[courseData] fetching...");

  const response = await fetch(COURSES_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.status}`);
  }

  const data = await response.json();

  console.log("[courseData] got", data.length, "courses");

  return data;
}

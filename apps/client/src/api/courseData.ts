import type { Course } from "../types/course";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/soc/api";
const COURSES_URL = `${API_BASE_URL}/courses.json?year=2026&term=7&campus=NB`;

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

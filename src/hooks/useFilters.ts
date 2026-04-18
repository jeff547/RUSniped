import { useState } from "react";
import { defaultFilters, type CourseFilters } from "../types/course";

export function useFilters() {
  const [filters, setFilters] = useState<CourseFilters>(defaultFilters);

  const setSearch = (search: string) =>
    setFilters((prev) => ({ ...prev, search }));

  const setOpenOnly = (openOnly: boolean) =>
    setFilters((prev) => ({ ...prev, openOnly }));

  const toggleSubject = (subject: string) =>
    setFilters((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));

  const clearFilters = () => setFilters(defaultFilters);

  const hasActiveFilters =
    filters.search !== "" || filters.subjects.length > 0 || filters.openOnly;

  return {
    filters,
    setSearch,
    setOpenOnly,
    toggleSubject,
    clearFilters,
    hasActiveFilters,
  };
}

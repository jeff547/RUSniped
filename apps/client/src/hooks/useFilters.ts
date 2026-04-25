import { useState } from "react";
import { defaultFilters, type CourseFilters } from "@rusniped/shared";

export function useFilters() {
  const [filters, setFilters] = useState<CourseFilters>(defaultFilters);

  const setSearch = (search: string) =>
    setFilters((prev) => ({ ...prev, search }));

  const setOpenOnly = (openOnly: boolean) =>
    setFilters((prev) => ({ ...prev, openOnly }));

  const setOnlineOnly = (onlineOnly: boolean) =>
    setFilters((prev) => ({ ...prev, onlineOnly }));

  const toggleSubject = (subject: string) =>
    setFilters((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));

  const toggleCoreCode = (code: string) =>
    setFilters((prev) => ({
      ...prev,
      coreCodes: prev.coreCodes.includes(code)
        ? prev.coreCodes.filter((c) => c !== code)
        : [...prev.coreCodes, code],
    }));

  const clearFilters = () => setFilters(defaultFilters);

  const hasActiveFilters =
    filters.search !== "" ||
    filters.subjects.length > 0 ||
    filters.coreCodes.length > 0 ||
    filters.onlineOnly ||
    filters.openOnly;

  return {
    filters,
    setSearch,
    setOpenOnly,
    setOnlineOnly,
    toggleSubject,
    toggleCoreCode,
    clearFilters,
    hasActiveFilters,
  };
}

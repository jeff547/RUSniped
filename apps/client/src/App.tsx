import { useCourses } from "./hooks/useCourses";
import { CourseList } from "./components/CourseList";
import { useFilters } from "./hooks/useFilters";
import { useMemo } from "react";
import { filterCourses } from "./lib/filter";
import { FilterPanel } from "./components/FilterPanel";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  const {
    courses,
    isLoading,
    isError,
    error,
    lastUpdated,
    isFetching,
    refetch,
  } = useCourses();

  const {
    filters,
    setSearch,
    setOpenOnly,
    setOnlineOnly,
    toggleSubject,
    toggleCoreCode,
    clearFilters,
    hasActiveFilters,
  } = useFilters();

  const subjects = useMemo(() => {
    const uniqueMap = new Map(
      courses.map((c) => [c.subject, c.subjectDescription]),
    );
    return Array.from(uniqueMap.entries()).sort((a, b) =>
      a[0].localeCompare(b[0]),
    );
  }, [courses]);

  const coreCodes = useMemo(() => {
    const uniqueMap = new Map<string, string>();
    for (const course of courses) {
      for (const coreCode of course.coreCodes) {
        if (!uniqueMap.has(coreCode.code)) {
          uniqueMap.set(coreCode.code, coreCode.description);
        }
      }
    }
    return Array.from(uniqueMap.entries()).sort((a, b) =>
      a[0].localeCompare(b[0]),
    );
  }, [courses]);

  const filteredCourses = useMemo(
    () => filterCourses(courses, filters),
    [courses, filters],
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-stone-600">Loading course data...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-scarlet-700 max-w-md text-center">
          <p className="font-semibold">Error loading courses</p>
          <p className="text-sm mt-2">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="border-b-4 border-scarlet-600 bg-white dark:bg-stone-900">
        <div className="max-w-6xl mx-auto p-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-scarlet-600 dark:text-scarlet-400 tracking-tight">
              RUSniped
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {filteredCourses.length} of {courses.length} courses · Last
              updated {new Date(lastUpdated).toLocaleTimeString()}
              {isFetching && " · refreshing..."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="rounded bg-scarlet-600 hover:bg-scarlet-700 px-3 py-1.5
                         text-sm font-medium text-white disabled:opacity-50 transition-colors"
            >
              {isFetching ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        <aside>
          <FilterPanel
            filters={filters}
            subjects={subjects}
            coreCodes={coreCodes}
            onSearchChange={setSearch}
            onSubjectToggle={toggleSubject}
            onCoreCodeToggle={toggleCoreCode}
            onOpenOnlyChange={setOpenOnly}
            onOnlineOnlyChange={setOnlineOnly}
            onClear={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </aside>

        <section>
          <CourseList courses={filteredCourses} />
        </section>
      </main>
    </div>
  );
}

export default App;

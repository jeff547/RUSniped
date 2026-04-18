import type { CourseFilters } from "../types/course";

type FilterPanelProps = {
  filters: CourseFilters;
  subjects: [string, string][];
  onSearchChange: (search: string) => void;
  onSubjectToggle: (subject: string) => void;
  onOpenOnlyChange: (openOnly: boolean) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
};

export function FilterPanel({
  filters,
  subjects,
  onSearchChange,
  onSubjectToggle,
  onOpenOnlyChange,
  onClear,
  hasActiveFilters,
}: FilterPanelProps) {
  return (
    <div className="rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 space-y-4">
      <div>
        <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
          Search
        </label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Course number, title, or instructor..."
          className="w-full rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-scarlet-600 focus:border-transparent"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.openOnly}
            onChange={(e) => onOpenOnlyChange(e.target.checked)}
            className="rounded border-stone-300 dark:border-stone-600 text-scarlet-600 focus:ring-scarlet-600"
          />
          <span className="text-sm text-stone-700 dark:text-stone-300">
            Open sections only
          </span>
        </label>
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-2">
          Subject{" "}
          {filters.subjects.length > 0 &&
            `(${filters.subjects.length} selected)`}
        </label>
        <div className="max-h-48 overflow-y-auto space-y-1 border border-stone-200 dark:border-stone-700 rounded p-2">
          {subjects.map(([code, description]) => (
            <label
              key={code}
              className="flex items-center gap-2 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800 px-1 py-0.5 rounded"
            >
              <input
                type="checkbox"
                checked={filters.subjects.includes(code)}
                onChange={() => onSubjectToggle(code)}
                className="rounded border-stone-300 dark:border-stone-600 text-scarlet-600 focus:ring-scarlet-600"
              />
              <span className="text-sm text-stone-700 dark:text-stone-300 truncate">
                <span className="font-mono text-xs text-stone-400 dark:text-stone-500 mr-2">
                  {code}
                </span>
                {description}
              </span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="text-sm text-scarlet-600 dark:text-scarlet-400 hover:text-scarlet-700 dark:hover:text-scarlet-300 hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

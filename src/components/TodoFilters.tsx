import type { FilterType } from "@/types/todo";
import { Button } from "@/components/ui/button";

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  totalCount: number;
  activeCount: number;
  completedCount: number;
}

export function TodoFilters({
  currentFilter,
  onFilterChange,
  totalCount,
  activeCount,
  completedCount,
}: TodoFiltersProps) {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: totalCount },
    { key: 'active', label: 'Active', count: activeCount },
    { key: 'completed', label: 'Completed', count: completedCount },
  ];

  return (
    <div className="flex items-center justify-between border-t pt-4 mt-6">
      <div className="flex gap-1">
        {filters.map(({ key, label, count }) => (
          <Button
            key={key}
            variant={currentFilter === key ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange(key)}
            className="text-xs"
          >
            {label} ({count})
          </Button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">
        {activeCount === 0 && totalCount > 0
          ? "All done! 🎉"
          : `${activeCount} item${activeCount !== 1 ? 's' : ''} left`}
      </div>
    </div>
  );
}
import { FilterChip } from "@/components/ui/FilterChip";

const categories = ["全部", "荧光棒", "服装", "周边", "卡片", "海报", "更多"];

export function CategoryChips() {
  return (
    <div
      className="-mx-4 flex gap-2 overflow-x-auto overscroll-x-contain px-4 py-1 [-webkit-overflow-scrolling:touch]"
      data-testid="category-scroll"
    >
      {categories.map((category, index) => (
        <FilterChip active={index === 0} key={category}>
          {category}
        </FilterChip>
      ))}
      <span className="h-px w-4 shrink-0" aria-hidden="true" />
    </div>
  );
}

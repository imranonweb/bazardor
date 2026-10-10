"use client";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-500" htmlFor="sort-products">
        সাজান
      </label>
      <select
        id="sort-products"
        className="select select-bordered select-sm bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
      </select>
    </div>
  );
}

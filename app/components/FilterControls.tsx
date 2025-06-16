"use client";

import { Product } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  originalProducts: Product[];
};

// Helper to get unique values for filter dropdowns from the data
const getUniqueValues = (key: keyof Product, array: Product[]): string[] => {
  const unique = [...new Set(array?.map((item) => item[key]))];
  // Ensure all values are strings before sorting
  return unique.map(String).sort();
};

function FilterControls({ originalProducts }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Get unique values for dropdowns
  const categories = getUniqueValues("category", originalProducts);
  const colors = getUniqueValues("color", originalProducts);
  const sizes = getUniqueValues("size", originalProducts);
  const priceRanges = {
    "0-50": "Under $50",
    "51-100": "$51 - $100",
    "101-200": "$101 - $200",
    "201-": "Over $200",
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    const params = new URLSearchParams();
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* Category Filter */}
        <div className="w-full">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            onChange={handleChange}
            value={searchParams.get("category") || ""}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Color Filter */}
        <div className="w-full">
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Color
          </label>
          <select
            id="color"
            name="color"
            onChange={handleChange}
            value={searchParams.get("color") || ""}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option value="">All Colors</option>
            {colors.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        {/* Size Filter */}
        <div className="w-full">
          <label
            htmlFor="size"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Size
          </label>
          <select
            id="size"
            name="size"
            onChange={handleChange}
            value={searchParams.get("size") || ""}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option value="">All Sizes</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div className="w-full">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price
          </label>
          <select
            id="price"
            name="price"
            onChange={handleChange}
            value={searchParams.get("price") || ""}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option value="">Any Price</option>
            {Object.entries(priceRanges).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Button */}
        <div className="w-full">
          <button
            onClick={handleReset}
            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterControls;

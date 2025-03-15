"use client";

import { useFilter } from "@/context/FilterContext";
import React from "react";

export default function Tab() {
  const { filters, filter, setFilter } = useFilter();

  return (
    <nav className="border-b">
      <ul className="flex">
        {filters.map((value, index) => {
          return (
            <li
              key={index}
              className={`${
                filter === value ? "bg-red-200" : null
              } py-3 px-5 m-1 rounded-md`}
            >
              <button onClick={() => setFilter(value)}>{value}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import React, { createContext, useContext, useState } from "react";

type Props = {
  filters: string[];
  filter: string;
  setFilter: (value: string) => void;
};

const FilterContext = createContext<Props>({
  filters: ["전체", "완료"],
  filter: "전체",
  setFilter: () => {},
});

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const filters = ["전체", "완료"];
  const [filter, setFilter] = useState(filters[0]);

  return (
    <FilterContext.Provider value={{ filters, filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);

"use client";
import React, { Suspense, useState } from "react";
import Tab from "./Tab";
import Todos from "./Todos";
import TodoForm from "./TodoForm";

const filters = ["전체", "완료"];

export default function TodoList() {
  const [filter, setFilter] = useState(filters[0]);
  return (
    <>
      <Tab filters={filters} filter={filter} onChange={setFilter} />
      <Suspense fallback={"로딩"}>
        <Todos filter={filter} />
      </Suspense>
      <TodoForm />
    </>
  );
}

"use client";

import React, { Suspense, useState } from "react";
import Tab from "./Tab";
import Todos from "./Todos";
import TodoForm from "./TodoForm";
import Loading from "./Loading";

const filters = ["전체", "완료"];

export default function TodoList() {
  const [filter, setFilter] = useState(filters[0]);

  return (
    <>
      <h1 className="font-bold text-4xl md:text-5xl mb-10 text-center mx-5">
        할일 목록
      </h1>
      <div className="border max-w-3xl md:min-w-lg rounded-md mx-5">
        <Tab filters={filters} filter={filter} onChange={setFilter} />
        <Suspense fallback={<Loading />}>
          <Todos filter={filter} />
        </Suspense>
        <TodoForm />
      </div>
    </>
  );
}

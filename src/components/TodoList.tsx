import React, { Suspense } from "react";
import Tab from "./Tab";
import Todos from "./Todos";
import AddTask from "./AddTask";
import Loading from "./Loading";

export default function TodoList() {
  return (
    <div className="text-center my-5 flex flex-col gap-4">
      <h1 className="font-bold text-lg">Todo List App</h1>

      <Tab />
      <Suspense fallback={<Loading />}>
        <Todos />
      </Suspense>
      <AddTask />
    </div>
  );
}

"use client";

import React from "react";
import { useFilter } from "@/context/FilterContext";
import { useTodosData } from "@/hooks/useTodosData";
import Loading from "./Loading";
import TodoItem from "./TodoItem";
import { Todo } from "@/types/todos";

const getFilteredItems = (todos: Todo[], filter: string): Todo[] => {
  if (filter === "전체") {
    return todos;
  }
  return todos.filter((todo) => todo.completed);
};

export default function Todos() {
  const { filter } = useFilter();
  const { todos, isLoading, updateTodo, deleteTodo } = useTodosData();

  if (isLoading) return <Loading />;

  const filteredTodos = todos ? getFilteredItems(todos, filter) : [];

  return (
    <section className="p-5">
      <ul className="flex flex-col gap-5">
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} onUpdate={updateTodo} onDelete={deleteTodo} />
          </li>
        ))}
      </ul>
    </section>
  );
}

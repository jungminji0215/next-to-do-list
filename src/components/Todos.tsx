"use client";

import { getTodos } from "@/service/todos";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Todos() {
  const { data } = useQuery({ queryKey: ["todos"], queryFn: getTodos });

  return (
    <>
      <ul>
        {data?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}

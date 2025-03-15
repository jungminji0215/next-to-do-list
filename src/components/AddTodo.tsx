"use client";

import { addTodo } from "@/service/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Button from "./Button";

export default function AddTodo() {
  const queryClient = useQueryClient();

  const [todo, setTodo] = useState("");

  const mutation = useMutation({
    mutationFn: (newTodo: string) => addTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.trim()) return;
    mutation.mutate(todo);
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-1 flex justify-between gap-2">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="할 일을 입력하세요"
        className="p-2 w-full bg-gray-200 rounded-lg"
      />
      <Button variant="warning" type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "등록중..." : "등록"}
      </Button>
    </form>
  );
}

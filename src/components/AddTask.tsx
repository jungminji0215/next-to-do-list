"use client";

import { addTodo } from "@/service/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

export default function AddTask() {
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
    <form onSubmit={handleSubmit} className="border-t p-1 flex justify-between">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="할 일을 입력하세요"
        className="p-2 w-full"
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-yellow-500 whitespace-nowrap rounded-md p-2"
      >
        {mutation.isPending ? "등록중..." : "등록"}
      </button>
    </form>
  );
}

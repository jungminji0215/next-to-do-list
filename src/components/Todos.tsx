"use client";

import { getTodos, updateTodo } from "@/service/todos";
import { Todo } from "@/types/todos";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";

type UpdateTodoParams = {
  title: string;
  id: string;
  completed: boolean;
};

export default function Todos() {
  const queryClient = useQueryClient();

  const [todoId, setTodoId] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  const { data } = useSuspenseQuery({ queryKey: ["todos"], queryFn: getTodos });

  const updateMutation = useMutation({
    mutationFn: (todo: Todo) => updateTodo(todo.title, todo.id, todo.completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });

      setTodoId(null);
      setTitle("");
    },
  });

  const handleUpdate = (todo: Todo) => {
    if (title.trim() !== "" && title !== todo.title) {
      updateMutation.mutate({
        title: title,
        id: todo.id,
        completed: todo.completed,
      });
    } else {
      setTodoId(null);
      setTitle("");
    }
  };

  const handleEdit = (todo: {
    id: string;
    title: string;
    completed: boolean;
  }) => {
    setTodoId(todo.id);
    setTitle(todo.title);
  };

  const handleCancelEdit = () => {
    setTodoId(null);
    setTitle("");
  };

  return (
    <>
      <ul>
        {data?.map((todo) => (
          <li key={todo.id}>
            {todoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={() => handleUpdate(todo)}>저장</button>
                <button onClick={handleCancelEdit}>취소</button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <button onClick={() => handleEdit(todo)}>수정</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

"use client";

import { deleteTodo, getTodos, updateTodo } from "@/service/todos";
import { Todo } from "@/types/todos";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";

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

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
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

  const handleEdit = (todo: Todo) => {
    setTodoId(todo.id);
    setTitle(todo.title);
  };

  const handleCancelEdit = () => {
    setTodoId(null);
    setTitle("");
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleToggleComplete = (todo: Todo, newCompleted: boolean) => {
    updateMutation.mutate({
      title: todo.title,
      id: todo.id,
      completed: newCompleted,
    });
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
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={todo.completed}
                  onChange={(e) => handleToggleComplete(todo, e.target.checked)}
                />
                <label htmlFor="checkbox">{todo.title}</label>
                <button onClick={() => handleEdit(todo)}>수정</button>
                <button onClick={() => handleDelete(todo.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

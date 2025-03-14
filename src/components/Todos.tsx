"use client";

import { deleteTodo, getTodos, updateTodo } from "@/service/todos";
import { Todo } from "@/types/todos";
import {
  useMutation,
  useQuery,
  useQueryClient,
  // useSuspenseQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";

const getFilteredItems = (todos: Todo[], filter: string) => {
  if (filter === "전체") {
    return todos;
  }
  return todos.filter((todo) => todo.completed === true);
};

export default function Todos({ filter }: { filter: string }) {
  const queryClient = useQueryClient();

  const [todoId, setTodoId] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  const { data } = useQuery({ queryKey: ["todos"], queryFn: getTodos });

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

  console.log("data :>> ", data);
  const filtered = getFilteredItems(data!, filter);

  return (
    <section className="p-5">
      <ul className="flex flex-col gap-5">
        {filtered?.map((todo) => (
          <li key={todo.id}>
            {todoId === todo.id ? (
              <div className="flex justify-between border-b border-gray-400 p-2 gap-5">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(todo)}
                    className="bg-yellow-500 text-white rounded-md p-1"
                  >
                    저장
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-black text-white rounded-md p-1"
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between border-b border-gray-400 p-2 gap-5">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={todo.completed}
                    onChange={(e) =>
                      handleToggleComplete(todo, e.target.checked)
                    }
                  />
                  <label
                    htmlFor="checkbox"
                    className={
                      todo.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {todo.title}
                  </label>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="bg-blue-500 text-white rounded-md p-1"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 text-white rounded-md p-1"
                  >
                    삭제
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

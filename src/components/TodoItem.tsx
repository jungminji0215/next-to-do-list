"use client";

import React, { useState } from "react";
import { Todo } from "@/types/todos";
import Button from "./Button";

type Props = {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onUpdate, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleSave = () => {
    if (title.trim() !== "" && title !== todo.title) {
      onUpdate({ ...todo, title });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setIsEditing(false);
  };

  const handleToggleComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...todo, completed: e.target.checked });
  };

  if (isEditing) {
    return (
      <div className="flex justify-between border-b border-gray-400 p-2 gap-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-200 rounded-lg pl-2"
        />
        <div className="flex gap-2">
          <Button variant="warning" onClick={handleSave}>
            저장
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            취소
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between border-b border-gray-400 p-2 gap-5">
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
        />
        <label className={todo.completed ? "line-through text-gray-500" : ""}>
          {todo.title}
        </label>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" onClick={() => setIsEditing(true)}>
          수정
        </Button>
        <Button variant="danger" onClick={() => onDelete(todo.id)}>
          삭제
        </Button>
      </div>
    </div>
  );
}

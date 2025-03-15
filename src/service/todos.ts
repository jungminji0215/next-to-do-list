import { Todo } from "@/types/todos";

export const getTodos = async (): Promise<Todo[]> => {
  // loading 테스트
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`);
  const data = await response.json();
  return data;
};

export const addTodo = async (todo: string) => {
  console.log("========== todos 등록 ==========");

  //   loading 테스트
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: String(Math.random()),
      title: todo,
      completed: false,
    }),
  });

  if (!response.ok) {
    throw new Error("fail add todo");
  }

  return {
    success: true,
    message: "성공",
  };
};

export const updateTodo = async (
  todo: string,
  id: string,
  completed: boolean
) => {
  console.log("========== todos 수정 ==========");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        title: todo,
        completed,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("fail update todo");
  }

  return {
    success: true,
    message: "성공",
  };
};

export const deleteTodo = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  console.log("========== todos 삭제 ==========");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("fail delete todo");
  }

  return {
    success: true,
    message: "성공",
  };
};

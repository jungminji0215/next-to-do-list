import { Todo } from "@/types/todos";

export const getTodos = async (): Promise<Todo[]> => {
  console.log("========== todos 가져오는 중 ==========");

  // loading 테스트
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch("http://localhost:3001/todos");
  const data = await response.json();
  return data;
};

export const addTodo = async (todo: string) => {
  console.log("========== todos 등록 ==========");

  //   loading 테스트
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch("http://localhost:3001/todos", {
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

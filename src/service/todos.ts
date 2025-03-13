import { Todo } from "@/types/todos";

export const getTodos = async (): Promise<Todo[]> => {
  console.log("========== todos 가져오는 중 ==========");

  // loading 테스트
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch("http://localhost:3001/todos");
  const data = await response.json();
  return data;
};

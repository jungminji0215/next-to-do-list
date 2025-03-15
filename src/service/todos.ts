import { Todo } from "@/types/todos";

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "투두 조회에 실패했습니다.");
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "알 수 없는 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

export const addTodo = async (todo: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: String(Math.floor(1000000000 + Math.random() * 9000000000)),
        title: todo,
        completed: false,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "투두 추가에 실패했습니다.");
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "알 수 없는 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

export const updateTodo = async (
  todo: string,
  id: string,
  completed: boolean
) => {
  try {
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
      const errorData = await response.json();
      throw new Error(errorData.message || "투두 수정에 실패했습니다.");
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "알 수 없는 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

export const deleteTodo = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "투두 삭제에 실패했습니다.");
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "알 수 없는 오류가 발생했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

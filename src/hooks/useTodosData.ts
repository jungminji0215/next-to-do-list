import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, updateTodo, deleteTodo } from "@/service/todos";
import { Todo } from "@/types/todos";

export function useTodosData() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const updateMutation = useMutation({
    mutationFn: (todo: Todo) => updateTodo(todo.title, todo.id, todo.completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos: data,
    isLoading,
    updateTodo: updateMutation.mutate,
    deleteTodo: deleteMutation.mutate,
  };
}

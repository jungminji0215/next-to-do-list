import { Suspense } from "react";
import TodoForm from "@/components/TodoForm";
import Todos from "@/components/Todos";

export default async function Home() {
  return (
    <>
      <h1>TD DO List</h1>
      <Suspense fallback={"로딩"}>
        <Todos />
      </Suspense>
      <TodoForm />
    </>
  );
}

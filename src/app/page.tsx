import { Suspense } from "react";
import TodoSection from "@/components/TodoSection";

export default async function Home() {
  return (
    <>
      <h1>TD DO List</h1>
      <Suspense fallback={"로딩"}>
        <TodoSection />
      </Suspense>
    </>
  );
}

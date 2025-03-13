import { getQueryClient } from "@/app/get-query-client";
import { getTodos } from "@/service/todos";
import React from "react";
import Todos from "./Todos";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function TodoSection() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Todos />
      </HydrationBoundary>
    </div>
  );
}

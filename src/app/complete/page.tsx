import React from "react";
import { getQueryClient } from "../get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function TodoDetailPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>
    </div>
  );
}

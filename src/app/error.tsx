"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold">문제가 발생했습니다.</h2>
      <p className="my-4">오류 메시지: {error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-blue-500 text-white rounded-md p-2"
      >
        다시 시도하기
      </button>
    </div>
  );
}

import React from "react";

export default function Tab({
  filters,
  filter,
  onChange,
}: {
  filters: string[];
  filter: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <ul>
        {filters.map((value, index) => {
          return (
            <li key={index}>
              <button onClick={() => onChange(value)}>{value}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

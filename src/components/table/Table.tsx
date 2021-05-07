import React from "react";

import type { ITableProps } from "./types";

export const Table: React.FunctionComponent<ITableProps> = ({
  columns,
  rows,
}) => {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.id}
              className="text-sm text-left font-bold border-b border-gray-200 p-2"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows?.map((row) => {
          return (
            <tr key={row.city}>
              {columns.map((col) => {
                const value = (row as any)[col.id];
                return (
                  <td
                    key={col.id}
                    className="text-sm border-b border-gray-200 py-3 px-2"
                  >
                    {col.render ? col.render(row) : value}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

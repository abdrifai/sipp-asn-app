import React from "react";

const Table = ({ data, columns }: any) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column: any) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => (
          <tr key={item.id}>
            {columns.map((column: any) => (
              <td key={`${item.id}-${column}`}>{item[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

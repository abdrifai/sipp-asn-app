import React from "react";

const ItemRiwayat = (data: any) => {
  return (
    <>
      {data &&
        data.map((item: any, index: number) => (
          <tr
            key={item.id}
            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
            onClick={() => {}}
          >
            <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
              {index + 1}
            </td>
            <td className="whitespace-nowrap px-4 py-3">{item.golongan.gol}</td>
            <td className="whitespace-nowrap px-4 py-3">{item.sk}</td>
            <td className="whitespace-nowrap px-4 py-3 text-center">
              {new Date(item.tmtSk).toLocaleDateString("id")}
            </td>
            <td className="whitespace-nowrap px-4 py-3">{item.pertekBkn}</td>
            <td className="whitespace-nowrap px-4 py-3 text-center">
              {new Date(item.tglPertek).toLocaleDateString("id")}
            </td>
            <td className="whitespace-nowrap px-4 py-3">-</td>
          </tr>
        ))}
    </>
  );
};

export default ItemRiwayat;

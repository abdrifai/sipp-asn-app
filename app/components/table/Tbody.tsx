"use client";

interface TbodyProps {
  noUrut: string;
  gol: string;
  nSK: string;
  tmtSK?: string;
  nPertek?: string;
  tglPertek?: string;
  ket?: string;
  onClick?: () => void;
}

const Tbody: React.FC<TbodyProps> = ({
  noUrut,
  gol,
  nSK,
  tmtSK,
  nPertek,
  tglPertek,
  ket,
  onClick,
}) => {
  return (
    <>
      <tr
        key={noUrut}
        onClick={onClick}
        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
      >
        <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
          {noUrut}
        </td>
        <td className="whitespace-nowrap px-4 py-3">{gol}</td>
        <td className="whitespace-nowrap px-4 py-3">{nSK}</td>
        <td className="whitespace-nowrap px-4 py-3 text-center">{tmtSK}</td>
        <td className="whitespace-nowrap px-4 py-3">{nPertek}</td>
        <td className="whitespace-nowrap px-4 py-3 text-center">{tglPertek}</td>
        <td className="whitespace-nowrap px-4 py-3">{ket}</td>
      </tr>
    </>
  );
};

export default Tbody;

"use client";

interface BoxProps {
  title: string;
  children: React.ReactNode;
}

const BoxRiwayatBKN: React.FC<BoxProps> = ({ title, children }) => {
  return (
    <div className="border-2 p-2 rounded-lg">
      <div className="flex flex-row justify-between items-center border-b-2 pb-2">
        <div className="font-bold pl-3">{title}</div>
      </div>
      <div className="pt-2">{children}</div>
    </div>
  );
};

export default BoxRiwayatBKN;

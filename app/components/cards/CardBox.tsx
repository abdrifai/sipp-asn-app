"use client";
interface CardBoxProps {
  title: string;
  footer?: boolean;
  border?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const CardBox: React.FC<CardBoxProps> = ({
  title,
  footer,
  border,
  onClose,
  children,
}) => {
  return (
    <div
      className={`
          w-full border-2 p-2 rounded-lg mt-4 transition`}
    >
      <div
        className="flex justify-center items-center font-bold border-b-2
          h-10"
      >
        {title}
      </div>
      <div className="px-2 py-4">{children}</div>
      {footer ? (
        <div className="border-t-2 p-2 flex items-center gap-2">
          <button
            onClick={() => {}}
            className="flex items-center gap-2 border text-slate-300 hover:text-slate-600 rounded-md py-2 px-3 hover:bg-slate-100 font-semibold text-left"
          >
            Simpan
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 border text-slate-300 hover:text-slate-600 rounded-md py-2 px-3 hover:bg-slate-100 font-semibold text-left"
          >
            Batal
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardBox;

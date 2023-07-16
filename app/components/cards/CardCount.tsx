"use client";
import { IconType, icons } from "react-icons";

interface CardCountProps {
  count?: string;
  description?: string;
  icon?: IconType;
  bg_gradient?: string;
}

const CardCount: React.FC<CardCountProps> = ({
  count,
  description,
  icon: Icon,
  bg_gradient,
}) => {
  return (
    <div
      className={`
          border-2 p-2 rounded-md mt-4 transition w-[250px] ${bg_gradient}`}
    >
      <div className="px-2 py-4 text-center">
        <h4 className="font-bold text-3xl text-slate-600">{count}</h4>
        <span className="text-slate-400">{description}</span>
      </div>
    </div>
  );
};

export default CardCount;

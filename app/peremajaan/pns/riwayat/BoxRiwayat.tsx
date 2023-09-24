"use client";

import { useRouter } from "next/navigation";
import useModalCompare from "@/app/hooks/useModalCompare";
import DropdownCompare from "@/app/components/dropdown/DropdownCompare";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import ModalCompare from "@/app/components/modal/ModalCompare";
import { FaPlusCircle, FaArrowAltCircleLeft } from "react-icons/fa";
// import { BsFillPlusCircleFill } from "react-icons/bs";

interface BoxProps {
  title: string;
  children: React.ReactNode;
  buttonAdd?: boolean;
  onToggel?: () => void;
}

const BoxRiwayat: React.FC<BoxProps> = ({
  title,
  children,
  buttonAdd,
  onToggel,
}) => {
  const router = useRouter();
  const modalCompare = useModalCompare();

  return (
    <div className="border-2 p-2 rounded-lg mt-3">
      <div
        className="grid grid-cols-12 items-center font-bold border-b-2
          h-12"
      >
        {buttonAdd ? (
          <>
            <div className="col-span-1 pl-2 hover:cursor-pointer text-slate-400 hover:text-green-500 ">
              <FaPlusCircle size={24} onClick={onToggel} />
            </div>
            <div className="col-span-10 flex items-center justify-center text-slate-500">
              {title}
            </div>
            <div className="col-span-1 flex justify-end pr-2 hover:cursor-pointer text-slate-400 hover:text-green-500 ">
              <FaArrowAltCircleLeft size={24} onClick={() => router.back()} />
            </div>
          </>
        ) : (
          <div className="col-span-12 flex items-center justify-center">
            {title}
          </div>
        )}
      </div>
      <div className="h-80 overflow-auto">{children}</div>
    </div>
  );
};

export default BoxRiwayat;

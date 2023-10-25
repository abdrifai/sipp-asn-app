"use client";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { MdOutlineSyncProblem } from "react-icons/md";

interface DropdownProps {
  title: string;
  link?: string;
  // onClickEdit?: () => void;
  // onClickHapus?: () => void;
  onToggel?: () => void;
  onSync?: () => void;
}

const DropdownMenuAdd: React.FC<DropdownProps> = ({
  title,
  link,
  // onClickEdit,
  // onClickHapus,
  onToggel,
  onSync,
}) => {
  const deleteConfirmation = () => {};

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {/* <button className="text-sm font-semibold hover:bg-slate-100 transition py-2 px-3 border rounded-lg outline-none hover:cursor-pointer hover:text-blue-500">
          {title}
        </button> */}
        <div className="col-span-1 pl-2 hover:cursor-pointer text-slate-400 hover:text-green-500 ">
          <FaPlusCircle size={24} />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white shadow-md border rounded-lg w-40 mt-1"
          align="start"
        >
          <DropdownMenu.Item
            className="flex items-center gap-2 text-slate-300 hover:text-green-600 hover:outline-none hover:cursor-pointer rounded-md py-2 px-3 hover:bg-slate-100 font-semibold text-left"
            onClick={onToggel}
          >
            <BsDatabaseFillAdd size={20} />
            <span>Add</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="flex items-center gap-2 text-slate-300 hover:text-green-600 hover:outline-none hover:cursor-pointer rounded-md py-2 px-3 hover:bg-slate-100 font-semibold text-left "
            onClick={onSync}
          >
            <MdOutlineSyncProblem size={20} />
            <span>Sync</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuAdd;

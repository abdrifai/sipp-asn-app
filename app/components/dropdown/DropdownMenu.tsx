"use client";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

interface DropdownProps {
  title: string;
  link?: string;
  onClickEdit?: () => void;
  onClickHapus?: () => void;
}

const DropdownMenuAction: React.FC<DropdownProps> = ({
  title,
  link,
  onClickEdit,
  onClickHapus,
}) => {
  const deleteConfirmation = () => {};

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="text-sm font-semibold hover:bg-slate-100 transition py-2 px-3 border rounded-lg outline-none hover:cursor-pointer hover:text-blue-500">
          {title}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white shadow-md border rounded-lg w-40">
          <DropdownMenu.Item
            className="flex items-center gap-2 text-slate-300 hover:text-green-600 hover:outline-none hover:cursor-pointer rounded-md py-2 px-3 hover:bg-slate-100 font-semibold text-left"
            onClick={onClickEdit}
          >
            <AiOutlineEdit size={20} />
            <span>Edit</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="flex items-center gap-2 text-slate-300 hover:text-red-600 hover:outline-none hover:cursor-pointer rounded-md py-2 px-3 hover:bg-slate-100 font-semibold text-left "
            onClick={onClickHapus}
          >
            <AiOutlineDelete />
            <span>Delete</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuAction;

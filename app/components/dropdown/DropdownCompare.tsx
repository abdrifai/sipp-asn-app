"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MdOutlinePreview, MdAutorenew } from "react-icons/md";

interface DropdownCompareProps {
  title: string;
  link?: string;
  onClickView?: () => void;
  onClickAuto?: () => void;
}

const DropdownCompare: React.FC<DropdownCompareProps> = ({
  title,
  link,
  onClickView,
  onClickAuto,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="text-sm font-semibold hover:bg-slate-100 transition py-2 px-3 border rounded-lg outline-none hover:cursor-pointer ">
          {title}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="bg-white shadow-md border rounded-lg w-40 mt-1"
        >
          <DropdownMenu.Item
            className="flex items-center gap-2 text-slate-300 hover:text-slate-600 hover:outline-none hover:cursor-pointer rounded-md py-2 px-3 hover:bg-slate-100 font-semibold text-left"
            onClick={onClickView}
          >
            <MdOutlinePreview size={20} />
            <span>View</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="flex items-center gap-2 text-slate-300 hover:text-slate-600 hover:outline-none hover:cursor-pointer rounded-md py-2 px-3 hover:bg-slate-100 font-semibold text-left"
            onClick={onClickAuto}
          >
            <MdAutorenew />
            <span>Auto</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownCompare;

"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

interface DialogProps {
  title: string;
  content?: string;
  isOpen: boolean;
  onClose?: () => void;
  onDelete?: () => void;
}

const DialogConfirmation: React.FC<DialogProps> = ({
  title,
  content,
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black bg-opacity-30 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="m-0 text-[17px] font-medium text-rose-600">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            {content}
          </Dialog.Description>
          <div className="mt-[25px] flex justify-end gap-3">
            <Dialog.Close asChild>
              <button
                className="text-sm font-semibold hover:bg-slate-100 transition py-2 px-3 border rounded-lg outline-none hover:cursor-pointer"
                onClick={onClose}
                aria-label="Close"
              >
                Cencel
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className="text-sm font-semibold hover:text-rose-500 focus:shadow-rose-400 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                onClick={onDelete}
              >
                Delete
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              onClick={onClose}
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogConfirmation;

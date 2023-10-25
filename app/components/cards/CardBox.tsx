"use client";

import { ChangeEvent, useState } from "react";

interface CardBoxProps {
  title: string;
  footer?: boolean;
  border?: boolean;
  onClose?: () => void;
  onSave?: () => void;
  onUpload?: () => void;
  children: React.ReactNode;
}

const CardBox: React.FC<CardBoxProps> = ({
  title,
  footer,
  border,
  onClose,
  onSave,
  onUpload,
  children,
}) => {
  const [image, setImage] = useState("");
  const [saveImage, setSaveImage] = useState<File | null>(null);

  const handleChangeUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      let uploaded = files[0];
      //  console.log(URL.createObjectURL(uploaded));
      setImage(URL.createObjectURL(uploaded));
      setSaveImage(uploaded);
    }
  };

  const handleSaveClick = async () => {
    if (!saveImage) {
      alert("Arsip belum diupload!!");
    } else {
      const formData = new FormData();
      formData.append("arsip", saveImage);
      const result = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      if (result.ok) {
        console.log("arsip di simpan");
      }
    }

    if (onSave) {
      onSave(); // Panggil fungsi onSave yang diberikan
    }
  };

  // const uploadArsip = () => {
  //   if (!saveImage) {
  //     alert("arsip belum di upload !!");
  //   } else {
  //     return onSave;
  //   }
  // };

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
        <div className="border-t-2 p-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveClick}
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
          <form className="flex items-center gap-2">
            <label
              htmlFor="file"
              className="flex items-center gap-2 border hover:text-red-600 rounded-md py-2 px-3 hover:bg-slate-100 font-semibold text-left flext"
            >
              {image ? (
                <span className="text-green-500">Archive Ready</span>
              ) : (
                <span className="text-red-500">Upload Arsip</span>
              )}

              <input
                id="file"
                name="file"
                type="file"
                onChange={handleChangeUpload}
                className="hidden"
              />
            </label>
            {image && (
              <span
                className="font-bold hover:cursor-pointer hover:text-red-600"
                onClick={() => setImage("")}
              >
                x
              </span>
            )}
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardBox;

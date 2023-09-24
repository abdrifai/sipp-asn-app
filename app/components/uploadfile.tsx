"use client";
import { ChangeEvent, useState } from "react";

const Uploadfile = () => {
  const [image, setImage] = useState("");
  // const [image, setImage] = useState("https://fakeimg.pl/350x500");
  const [saveImage, setSaveImage] = useState(null);

  const handleChangeUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      let uploaded = files[0];
      //  console.log(URL.createObjectURL(uploaded));
      setImage(URL.createObjectURL(uploaded));
    }
  };

  return (
    <div className="p-2 w-1/2">
      <form>
        <label
          htmlFor="file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-auto"
        >
          <div className="flex flex-col items-center justify-center w-full h-full">
            <span className="z-30 absolute font-bold text-xl text-blue-500">
              Click to Upload File
            </span>
            <embed
              src={image}
              type="application/pdf"
              className="w-full h-full"
            />
          </div>
        </label>
        <input
          id="file"
          name="file"
          type="file"
          onChange={handleChangeUpload}
          className="hidden"
        />
      </form>
    </div>
  );
};

export default Uploadfile;

import React from "react";
import { LuImages } from "react-icons/lu";
import { FiHash } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { useUploadImageMutation } from "../../rtkQuery/postQuery";
const UploadImage = ({ getImageUrl }) => {
  // const [uploadImage,{isLoading}]
  const handleSelectFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      let base64image = reader.result;
      getImageUrl(base64image);
    };
  };
  return (
    <div className="text-start sm:pl-14 flex gap-4">
      <label htmlFor="chooseImage" className="text-gray-500 cursor-pointer">
        <LuImages size={18} />
      </label>
      <button className="text-gray-500 cursor-pointer">
        <FiHash size={20} />
      </button>
      <button className="text-gray-500 cursor-pointer">
        <IoLocationOutline size={20} />
      </button>
      <button className="text-gray-500 cursor-pointer">
        <GoGift size={20} />
      </button>
      <input
        type="file"
        onChange={handleSelectFile}
        id="chooseImage"
        className="hidden"
      />
    </div>
  );
};

export default UploadImage;

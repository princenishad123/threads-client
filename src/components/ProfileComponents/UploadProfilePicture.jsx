import React, { useState } from "react";
import { useUploadProfilePictureMutation } from "../../rtkQuery/authQuery";
import { toast } from "keep-react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../../redux/authSlice";
const UploadProfilePicture = ({ profilePicture }) => {
  const { authUser } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const [imagePrev, setImagePrev] = useState(null);
  const [uploadProfilePicture, { isLoading, isError }] =
    useUploadProfilePictureMutation();

  const uploadProfile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      let base64image = reader.result;
      setImagePrev(base64image);

      dispatch(setAuthUser({ ...authUser, profilePicture: base64image }));
    };
  };
  return (
    <div className="w-full h-auto flex flex-col justify-center">
      <div className="flex h-14 w-14 o items-center overflow-hidden mx-auto justify-center rounded-full text-metal-900 bg-metal-800 dark:text-white">
        <img
          src={imagePrev || profilePicture}
          alt=""
          className="size-14 object-contain"
        />
      </div>
      <div className="mx-auto">
        <label
          htmlFor="chooseFileUpload"
          className="text-[16px] text-white cursor-pointer"
        >
          {isLoading ? "Uploading..." : " Change avatar"}
        </label>

        <input
          type="file"
          id="chooseFileUpload"
          className="hidden"
          accept="image/png, image/jpeg"
          name="profilePicture"
          disabled={isLoading}
          onChange={uploadProfile}
        />
      </div>
    </div>
  );
};

export default UploadProfilePicture;

import React, { useState, useRef } from "react";
import { LuImages } from "react-icons/lu";
import { FiHash } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import {
  Button,
  Modal,
  ModalAction,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "keep-react";
import { toast } from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import {
  useUploadImageMutation,
  useUploadPostMutation,
} from "../rtkQuery/postQuery";
import SmallLoader from "../components/SmallLoader";
import { useSelector } from "react-redux";
const UploadPostPopup = () => {
  const [closePopUp, setClosePopUp] = useState(false);
  const { authUser } = useSelector((state) => state.authSlice);
  // const [uploadImage,{isLoading,isError}]= useUploadImageMutation()
  const [text, setText] = useState(""); // State to manage textarea value
  const textareaRef = useRef(null);
  const [image, setImage] = useState(null);

  const [uploadPost, { isLoading, isError, status }] = useUploadPostMutation();

  const handleSelectFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      let base64image = reader.result;
      setImage(base64image);
    };
  };

  const handleInput = (event) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height to recalculate
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
    setText(event.target.value); // Update state
  };

  const handleUploadPost = async () => {
    setClosePopUp(false);
    try {
      const res = await toast.promise(uploadPost({ caption: text, image }), {
        loading: <b>Uploading...</b>,
        success: <b>Uploaded</b>,
        error: <b>Could not upload.</b>,
      });

      setText("");
      setImage(null);
    } catch (error) {
      console.error("Error uploading post:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Modal open={closePopUp}>
      <ModalAction asChild className="">
        <Button
          onClick={() => setClosePopUp(true)}
          className="size-auto p-0 content-center bg-transparent hover:bg-transparent text-gray-600"
        >
          <FiPlus size={30} />
        </Button>
      </ModalAction>

      <ModalContent className="max-w-2xl min-h-72 max-sm:h-screen bg-zinc-900 text-white border border-slate-600 max-sm:rounded-none">
        <ModalHeader className="">
          <div className="space-y-1  ">
            <ModalTitle className="w-full text-white flex justify-between border-b border-zinc-500 pb-3">
              <button onClick={() => setClosePopUp(false)}>Cancel</button>

              <span>new thread</span>
            </ModalTitle>
            <ModalDescription></ModalDescription>
            <div className="p-4">
              {/* user information */}
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full border overflow-hidden">
                  <img
                    src={authUser?.profilePicture}
                    alt="user"
                    className="object-contain"
                  />
                </div>
                <h3>{authUser?.username}</h3>
              </div>
              <div className="w-full min-h-4">
                <textarea
                  ref={textareaRef}
                  value={text}
                  onInput={handleInput}
                  className="w-full no-scrollbar sm:px-12 max-sm:mt-4 border-none rounded resize-none outline-none e max-h-64 min-h-4 bg-transparent overflow-y-auto"
                  placeholder="What's a new ?"
                ></textarea>

                {image && (
                  <div className="w-full max-h-72 my-4 sm:ml-14">
                    <img
                      src={image}
                      alt="post"
                      className="h-72 max-w-md object-cover rounded-xl "
                    />
                  </div>
                )}
                {/* choose file */}
                <div className="text-start sm:pl-14 flex gap-4">
                  <label
                    htmlFor="chooseImage"
                    className="text-gray-500 cursor-pointer"
                  >
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
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Private</span>
              <button
                onClick={handleUploadPost}
                className="border px-10 py-2 rounded-md"
              >
                {isLoading ? <SmallLoader /> : "Post"}
              </button>
            </div>
          </div>
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
};

export default UploadPostPopup;

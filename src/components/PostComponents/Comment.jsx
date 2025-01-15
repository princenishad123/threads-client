import React, { useState, useRef } from "react";

import { FaRegComment } from "react-icons/fa6";
import SmallLoader from "../SmallLoader";
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

import { useSelector } from "react-redux";
import {
  useAddCommentMutation,
  useLazyGetCommentsQuery,
} from "../../rtkQuery/postQuery";
import SearchSkeleton from "../SearchComponents/SearchSkeleton";

const Comment = ({ postId }) => {
  const [closePopUp, setClosePopUp] = useState(false);
  const { authUser } = useSelector((state) => state.authSlice);
  // const [uploadImage,{isLoading,isError}]= useUploadImageMutation()
  const [text, setText] = useState(""); // State to manage textarea value
  const [addComment, { data, isLoading, isError }] = useAddCommentMutation();

  const [getCommentTrigger, { data: comments, isLoading: commentsLoading }] =
    useLazyGetCommentsQuery();
  const handlePostPopUp = () => {
    setClosePopUp(true);
    getCommentTrigger({ postId });
  };

  const handleComment = async () => {
    let com = await addComment({ postId, comment: text });
  };
  const convertToIndianTime = (dateString) => {
    const event = new Date(dateString);
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return event.toLocaleString("en-IN", options);
  };

  return (
    <Modal open={closePopUp}>
      <ModalAction asChild className="">
        <Button
          onClick={handlePostPopUp}
          className="size-auto p-0 content-center bg-transparent hover:bg-transparent text-white"
        >
          <FaRegComment size={18} />
        </Button>
      </ModalAction>

      <ModalContent className="max-w-xl min-h-72 max-sm:h-screen bg-zinc-900 text-white border border-slate-600 max-sm:rounded-none">
        <ModalHeader className="">
          <div className="space-y-1">
            <ModalTitle className="w-full text-white flex justify-between border-b border-zinc-500 pb-3">
              <button onClick={() => setClosePopUp(false)}>Cancel</button>
              <span>Comment</span>
            </ModalTitle>
            <ModalDescription></ModalDescription>
            <div className="p-4">
              {/* user information */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 size-10 rounded-full border overflow-hidden">
                  <img
                    src={authUser?.profilePicture}
                    alt="user"
                    className="object-contain"
                  />
                </div>

                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="comment here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="py-1 px-2 rounded-md bg-slate-800 outline-none border-none w-full"
                  />
                </div>

                <button
                  onClick={handleComment}
                  className="flex-shrink-0 border p-2 rounded-md"
                >
                  {isLoading ? <SmallLoader /> : "post"}
                </button>
              </div>

              <div>
                {commentsLoading ? (
                  <>
                    <SearchSkeleton />
                    <SearchSkeleton />
                    <SearchSkeleton />
                    <SearchSkeleton />
                    <SearchSkeleton />
                  </>
                ) : (
                  comments?.map((comment) => (
                    <div
                      key={comment._id}
                      className="flex items-start gap-4 mt-4"
                    >
                      <div className="flex-shrink-0 size-8 rounded-full border overflow-hidden">
                        <img
                          src={comment.commentedBy.profilePicture}
                          alt="commenter"
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {comment.commentedBy.username}
                          </span>
                          <span className="text-sm text-gray-400">
                            {convertToIndianTime(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm">{comment.comment}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
};

export default Comment;

import { CloudArrowUp } from "phosphor-react";
import {
  Button,
  Modal,
  ModalAction,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  toast,
} from "keep-react";
import SmallLoader from "../../components/SmallLoader";
import { useUpdateProfileMutation } from "../../rtkQuery/authQuery";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import UploadProfilePicture from "./UploadProfilePicture";

import { setAuthUser } from "../../redux/authSlice";
const UpdateProfile = () => {
  const [updateProfile, { isError, isLoading }] = useUpdateProfileMutation();
  const { authUser } = useSelector((state) => state.authSlice);
  const [close, setClose] = useState(false);
  const dispatch = useDispatch();

  const [fromData, setFormData] = useState({
    username: authUser?.username,
    fullName: authUser?.fullName,
    bio: authUser?.bio,
    profilePicture: authUser?.profilePicture,
  });

  const handleUpdateProfile = async () => {
    const res = await updateProfile({
      ...fromData,
      profilePicture: authUser.profilePicture,
    });

    if (res.data) {
      toast.success(res.data.message);
      dispatch(
        setAuthUser({
          ...authUser,
          username: fromData.username,
          bio: fromData.bio,
          fullName: fromData.fullName,
        })
      );
      setClose(false);
    }

    if (res.error) {
      toast.error(res.error.data.message);
    }
  };

  return (
    <Modal open={close} className="dark">
      <ModalAction asChild>
        <Button
          onClick={() => setClose(true)}
          className="bg-transparent hover:bg-transparent py-1 w-full text-center border mt-2"
        >
          Edit Profile
        </Button>
      </ModalAction>
      <ModalContent className="bg-zinc-900 max-w-md max-sm:h-screen">
        <ModalHeader className="mb-6 dark">
          <UploadProfilePicture profilePicture={authUser?.profilePicture} />

          <div className="space-y-1">
            <ModalTitle className="font-normal text-center"></ModalTitle>
            <ModalDescription></ModalDescription>

            <div className="w-full">
              <form id="form">
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  onChange={(e) =>
                    setFormData({ ...fromData, username: e.target.value })
                  }
                  defaultValue={authUser?.username}
                  className="w-full bg-zinc-800 rounded-lg my-2 py-2 px-4 text-white outline-none border border-zinc-700"
                />
                <input
                  type="text"
                  name="fullName"
                  onChange={(e) =>
                    setFormData({ ...fromData, fullName: e.target.value })
                  }
                  defaultValue={authUser?.fullName}
                  placeholder="Enter Full name"
                  className="w-full bg-zinc-800 rounded-lg my-2 py-2 px-4 text-white outline-none border border-zinc-700"
                />
                <textarea
                  name="bio"
                  id=""
                  placeholder="bio"
                  onChange={(e) =>
                    setFormData({ ...fromData, bio: e.target.value })
                  }
                  defaultValue={authUser?.bio}
                  className="w-full h-28 bg-zinc-800 my-2 rounded-lg py-2 px-4 resize-none text-white outline-none border border-zinc-700"
                ></textarea>
              </form>
            </div>
          </div>
        </ModalHeader>
        <ModalFooter>
          <Button
            onClick={() => setClose(false)}
            variant="outline"
            className="text-red-500 border border-red-500"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateProfile}
            id="form"
            type="submit"
            className="bg-white text-black"
          >
            {isLoading ? <SmallLoader /> : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateProfile;

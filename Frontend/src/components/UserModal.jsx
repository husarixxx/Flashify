import { IoMdClose } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

import { Link } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { useLoggedIn } from "../context/LoggedInContext";

function UserModal({ userImg, username, modalClose }) {
  const { post } = usePost();
  const { setIsLoggedIn } = useLoggedIn();

  function logOut() {
    post({}, "logout");
    setIsLoggedIn(false);
  }

  return (
    <div className="z-100 border-1 border-gray-300 rounded-xl shadow-xl bg-white absolute top-14 right-0 p-4 hover:cursor-alias">
      <div className="flex justify-between items-center gap-14 mb-4 border-b-1 pb-3 border-gray-300">
        <div className="flex items-center gap-2">
          {userImg}
          <p className="font-bold">{username}</p>
        </div>
        <button onClick={modalClose} className="cursor-pointer">
          <IoMdClose size={28} />
        </button>
      </div>
      <div>
        <Link to={"/app/settings"} className="flex items-center gap-2">
          <IoSettingsOutline size={20} /> <p>Settings</p>
        </Link>
        <button
          className="flex items-center gap-2 mt-3 hover:cursor-pointer w-full"
          onClick={logOut}
        >
          <IoIosLogOut size={20} /> <p>Log out</p>
        </button>
      </div>
    </div>
  );
}

export default UserModal;

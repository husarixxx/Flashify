import { Link } from "react-router-dom";

import { TbCards } from "react-icons/tb";
import { MdOutlineQuiz } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { useLocation } from "react-router-dom";
import { useLoggedIn } from "../context/LoggedInContext";
import flashifyLogo from "../assets/flashify.png";
import { useState } from "react";
import UserModal from "./UserModal";
import { useUser } from "../context/UserContext";

function Header() {
  // {
  //   user = {
  //     img: <FaRegUserCircle size={25} />,
  //     username: "username",
  //   },
  // }
  const { isLoggedIn } = useLoggedIn();

  const { user } = useUser();

  const icons = [
    {
      icon: <TbCards size={23} />,
      text: "Flashcards",
      path: "/app/flashcards",
      regex: /flashcards/,
    },
    {
      icon: <MdOutlineQuiz size={23} />,
      text: "Quizzes",
      path: "/app/quizzes",
      regex: /quizzes/,
    },
    {
      icon: <TbNotes size={23} />,
      text: "Notes",
      path: "/app/notes",
      regex: /notes/,
    },

    {
      icon: <LiaLayerGroupSolid size={23} />,
      text: "Subjects",
      path: "/app/subjects",
      regex: /subject/,
    },
  ];

  const path = useLocation();

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  function closeUserModal() {
    setIsUserModalOpen(false);
  }

  return (
    <header className="flex justify-between gap-1 p-4 shadow-xl">
      <Link to={isLoggedIn ? "/app" : "/"} className="flex items-center">
        <img
          className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[150px]"
          src={flashifyLogo}
          alt=""
        />
      </Link>
      {icons && (
        <div className="flex justify-around grow gap-2 xm:mx-8 max-w-[220px] sm:max-w-[640px]">
          {isLoggedIn &&
            icons.map((icon, index) => (
              <Link
                to={icon.path}
                key={index}
                className={` p-1 flex items-center gap-2 hover:text-purple-600 group transition-colors ${
                  icon.regex.test(path.pathname)
                    ? "text-purple-600 border-b-2"
                    : "relative group"
                }`}
              >
                {icon.icon}
                <p
                  className={`hidden sm:block group-hover:text-purple-600 ${
                    icon.regex.test(path.pathname) ? "text-purple-600" : ""
                  }`}
                >
                  {icon.text}
                </p>
                <span className="absolute w-[100%] origin-left scale-0 group-hover:scale-100 bg-purple-700  bottom-0 left-0 h-[2px] transition-transform duration-300 ease-out"></span>
              </Link>
            ))}
        </div>
      )}
      {isLoggedIn ? (
        <div className="relative flex justify-center items-center">
          <button
            className="flex flex-col justify-center items-center hover:cursor-pointer "
            onClick={() => setIsUserModalOpen(!isUserModalOpen)}
          >
            {user ? <user.img size={25} /> : <FaRegUserCircle size={25} />}
            <p className="text-xs lg:text-base hidden lg:block">
              {user ? user.username : "username"}
            </p>
          </button>
          {isUserModalOpen && (
            <UserModal
              modalClose={closeUserModal}
              userImg={
                user ? <user.img size={25} /> : <FaRegUserCircle size={25} />
              }
              username={user ? user.username : "username"}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs lg:gap-4 lg:text-base">
          <Link
            to="/log-in"
            className=" text-gray-500 font-bold opacity-80 hover:cursor-pointer hover:opacity-100 transition-opacity"
          >
            Log in
          </Link>
          <Link
            to="/sign-up"
            className="m text-white font-bold bg-purple-500 py-2 px-4 rounded-3xl opacity-88 hover:cursor-pointer hover:opacity-100 transition-opacity shadow-md"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;

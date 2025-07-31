import { Link } from "react-router-dom";

import { TbCards } from "react-icons/tb";
import { MdOutlineQuiz } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import { IoIosStats } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { useLocation } from "react-router-dom";

function Header({
  loggedIn = false,
  user = {
    img: <FaRegUserCircle size={25} />,
    username: "username",
  },
  logo = "./src/assets/flashify.png",
}) {
  const icons = [
    {
      icon: <TbCards size={23} />,
      text: "Flashcards",
      path: "/home/flashcards",
      regex: /flashcards/,
    },
    {
      icon: <MdOutlineQuiz size={23} />,
      text: "Quizzes",
      path: "/home/quizzes",
      regex: /quizzes/,
    },
    {
      icon: <TbNotes size={23} />,
      text: "Notes",
      path: "/notes",
      regex: /notes/,
    },
    {
      icon: <IoIosStats size={23} />,
      text: "Stats",
      path: "/stats",
      regex: /stats/,
    },
    {
      icon: <LiaLayerGroupSolid size={23} />,
      text: "Subjects",
      path: "/subjects",
      regex: /subject/,
    },
  ];

  const path = useLocation();
  const flashcardRegex = /flashcards/;
  const isInFlashcards = flashcardRegex.test(path.pathname);

  return (
    <header className="flex justify-between gap-1 p-4 shadow-xl">
      <Link to="/" className="flex items-center">
        <img
          className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[150px]"
          src={logo}
          alt=""
        />
      </Link>
      {icons && (
        <div className="flex justify-around grow gap-2 max-w-[720px]">
          {loggedIn &&
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
      {loggedIn ? (
        <div className="flex flex-col justify-center items-center">
          {user.img}
          <p className="text-xs lg:text-base">{user.username}</p>
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

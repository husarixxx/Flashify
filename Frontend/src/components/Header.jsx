import { Link } from "react-router-dom";
function Header({ icons }) {
  return (
    <header className="flex justify-between p-4 shadow-xl">
      <Link to="/">
        <img
          className="w-[120px] lg:w-[160px]"
          src="./src/assets/flashify.png"
          alt=""
        />
      </Link>
      {icons && (
        <div>
          {icons.map((icon) => (
            <button>icon</button>
          ))}
        </div>
      )}
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
    </header>
  );
}

export default Header;

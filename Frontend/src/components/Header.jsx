import { Link } from "react-router-dom";
function Header({ icons, user }) {
  return (
    <header className="flex justify-between p-4 shadow-xl">
      <Link to="/" className="flex items-center">
        <img
          className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[150px]"
          src="./src/assets/flashify.png"
          alt=""
        />
      </Link>
      {icons && (
        <div className="flex justify-around grow gap-2 max-w-[720px]">
          {icons.map((icon, index) => (
            <Link
              to={icon.path}
              key={index}
              className="flex items-center gap-2"
            >
              {icon.icon}
              <p className="hidden sm:block">{icon.text}</p>
            </Link>
          ))}
        </div>
      )}
      {user ? (
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

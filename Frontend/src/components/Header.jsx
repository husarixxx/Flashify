function Header({ icons }) {
  return (
    <header className="flex justify-between p-4 shadow-xl">
      <img src="" alt="" />
      {icons && (
        <div>
          {icons.map((icon) => (
            <button>icon</button>
          ))}
        </div>
      )}
      <div className="flex gap-2 text-xs lg:gap-4 lg:text-base">
        <button className=" text-gray-500 font-bold opacity-80 hover:cursor-pointer hover:opacity-100 transition-opacity">
          Log in
        </button>
        <button className=" text-white font-bold bg-purple-500 py-2 px-4 rounded-3xl opacity-88 hover:cursor-pointer hover:opacity-100 transition-opacity shadow-md">
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;

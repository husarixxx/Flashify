function Streak({ streakNumber, days }) {
  return (
    <div className="p-4">
      <h2 className="text-lg lg:text-xl">Your Streak</h2>
      <div className="flex items-center ml-2">
        <img
          className="w-[30px] h-[45px] lg:w-[40px] lg:h-[60px]"
          src="./public/flashlight.png"
          alt="Logo"
        />
        <h1 className="text-2xl lg:text-4xl text-purple-600 my-5">
          {streakNumber}
        </h1>
      </div>
      <div className="ml-2 flex items-center justify-between max-w-[340px] lg:max-w-none gap-1 md:gap-5">
        {days.map((day) => (
          <div
            key={crypto.randomUUID()}
            className="flex flex-col justify-center items-center "
          >
            <span
              className={
                (day.isStreak
                  ? "bg-linear-180 from-pink-400 to-purple-600 text-white"
                  : "bg-gray-300 ") +
                " text-sm rounded-4xl w-[32px] h-[32px] lg:w-[38px] lg:h-[38px] lg:text-base flex items-center justify-center "
              }
            >
              {day.dayNumber}
            </span>
            <p className="my-2 text-gray-500 text-sm">{day.weekDay}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Streak;

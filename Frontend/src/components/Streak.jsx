function Streak({ streakNumber, days }) {
  return (
    <div className="p-4">
      <h2 className="text-[xl]">Your Streak</h2>
      <div className="flex items-center">
        <img
          className="w-[30px] h-[50px ]lg:w-[40px] lg:h-[60px]"
          src="./public/flashlight.png"
          alt="Logo"
        />
        <h1 className="text-2xl lg:text-4xl text-purple-600">{streakNumber}</h1>
      </div>
      <div className="flex items-center justify-between max-w-[420px]">
        {days.map((day) => (
          <div className="flex flex-col justify-center items-center">
            <span
              className={
                (day.isStreak
                  ? "bg-linear-180 from-pink-500 to-purple-600 text-white"
                  : "bg-gray-300 ") +
                " rounded-4xl w-[32px] h-[32px] lg:w-[42px] lg:h-[42px] flex items-center justify-center "
              }
            >
              {day.dayNumber}
            </span>
            <p>{day.weekDay}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Streak;

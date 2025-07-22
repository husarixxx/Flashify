import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { TbCards } from "react-icons/tb";
import { MdOutlineQuiz } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import Streak from "../../components/Streak";
import Container from "../../components/Container";
import { FaRegClock } from "react-icons/fa6";

function Home() {
  const streak = {
    streakNumber: 21,
    days: [
      { dayNumber: 17, isStreak: true, weekDay: "Mon" },
      { dayNumber: 18, isStreak: true, weekDay: "Tue" },
      { dayNumber: 19, isStreak: true, weekDay: "Wed" },
      { dayNumber: 20, isStreak: false, weekDay: "Thu" },
      { dayNumber: 21, isStreak: false, weekDay: "Fri" },
      { dayNumber: 22, isStreak: false, weekDay: "Sat" },
      { dayNumber: 23, isStreak: false, weekDay: "Sun" },
    ],
  };

  const recentylyUsed = [
    { title: "angielski", type: "flashcard" },
    { title: "matma", type: "note" },
    { title: "IT", type: "quiz" },
  ];
  const yourFavorites = [
    { title: "angielski", type: "flashcard", time: "2h 25 min" },
    { title: "matma", type: "note", time: "5h 12 min" },
    { title: "IT", type: "quiz", time: "3h" },
  ];

  const timeSpentThisWeek = {
    time: "25 minutes",
    text: "You have plenty of room to improve. Im counting on you!",
  };
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header loggedIn={true}></Header>

      <div className="md:flex items-start md:mx-auto">
        <div>
          <Streak
            streakNumber={streak.streakNumber}
            days={streak.days}
          ></Streak>

          <div className="p-4">
            <h2 className="text-lg lg:text-xl">Recently used</h2>
            {recentylyUsed.map((card) => (
              <Container key={crypto.randomUUID()}>
                <div className="flex items-center gap-2">
                  {card.type === "flashcard" ? (
                    <TbCards size={23} />
                  ) : card.type === "note" ? (
                    <TbNotes size={23} />
                  ) : (
                    <MdOutlineQuiz size={23} />
                  )}
                  <h3 className="">{card.title}</h3>
                </div>
                <p className="ml-8 mt-2 text-sm">{card.type}</p>
              </Container>
            ))}
          </div>
        </div>
        <div>
          <div className="p-4">
            <h2 className="text-lg lg:text-xl">Your favorites</h2>
            {yourFavorites.map((card) => (
              <Container key={crypto.randomUUID()}>
                <div className="flex items-center gap-2">
                  {card.type === "flashcard" ? (
                    <TbCards size={23} />
                  ) : card.type === "note" ? (
                    <TbNotes size={23} />
                  ) : (
                    <MdOutlineQuiz size={23} />
                  )}
                  <h3 className="">{card.title}</h3>
                </div>
                <p className="flex items-center gap-2 mt-2 text-sm">
                  <FaRegClock size={21} />
                  {`Time spend: ${card.time}`}
                </p>
              </Container>
            ))}
          </div>
          <div className="p-4">
            <h2 className="text-lg lg:text-xl">Time spent this week</h2>

            <Container>
              <div className="flex items-center gap-2">
                <FaRegClock size={20} />
                <h3>{timeSpentThisWeek.time}</h3>
              </div>
              <p className="flex items-center gap-2 mt-2 text-sm">
                {timeSpentThisWeek.text}
              </p>
            </Container>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { TbCards } from "react-icons/tb";
import { MdOutlineQuiz } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import { IoIosStats } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaLayerGroupSolid } from "react-icons/lia";
import Streak from "../../components/Streak";

function Home() {
  const icons = [
    { icon: <TbCards size={23} />, text: "Flashcards", path: "/flashcards" },
    { icon: <MdOutlineQuiz size={23} />, text: "Quizzes", path: "/quizzes" },
    { icon: <TbNotes size={23} />, text: "Notes", path: "/notes" },
    { icon: <IoIosStats size={23} />, text: "Stats", path: "/stats" },
    {
      icon: <LiaLayerGroupSolid size={23} />,
      text: "Subjects",
      path: "/subjects",
    },
  ];

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

  const user = {
    img: <FaRegUserCircle size={25} />,
    username: "username",
  };
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header icons={icons} user={user}></Header>
      <Streak streakNumber={streak.streakNumber} days={streak.days}></Streak>
      <Footer></Footer>
    </div>
  );
}

export default Home;

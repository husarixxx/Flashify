import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { TbCards } from "react-icons/tb";
import { MdOutlineQuiz } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import { IoIosStats } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

function Home() {
  const icons = [
    { icon: <TbCards size={24} />, text: "Flashcards", path: "/flashcards" },
    { icon: <MdOutlineQuiz size={24} />, text: "Quizzes", path: "/quizzes" },
    { icon: <TbNotes size={24} />, text: "Notes", path: "/notes" },
    { icon: <IoIosStats size={24} />, text: "Stats", path: "/stats" },
  ];

  const user = {
    img: <FaRegUserCircle size={25} />,
    username: "username",
  };
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header icons={icons} user={user}></Header>
      <Footer></Footer>
    </div>
  );
}

export default Home;

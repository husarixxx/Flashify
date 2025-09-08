import Header from "../../components/Header";
import Footer from "../../components/Footer";
import mySubjects from "../../exampleData";
import { TbCards } from "react-icons/tb";
import { MdOutlineQuiz } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import { useParams, Link } from "react-router-dom";
import { useSubjects } from "../../context/SubjectsContext";

function SubjectsSpecific() {
  let params = useParams();
  const subject = params.subject;

  // const subjects = Object.entries(mySubjects).map(([subject, data]) => {
  //   return {
  //     subject: subject,
  //     types: {
  //       flashcards: data.flashcards.length,
  //       quizzes: data.quizzes.length,
  //       notes: data.notes.length,
  //     },
  //   };
  // });
  // const subjectsFiltered = subjects.filter((subject) => {
  //   return subject.subject === params.subject;
  // });

  const { subjects } = useSubjects();
  console.log(subjects);

  const specificSubject = subjects.find(
    (currSubject) => currSubject.id === subject
  );
  console.log(specificSubject);
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header></Header>
      <div className="mx-4 p-4 sm:mx-auto max-w-[1200px] md:translate-y-[-80px]">
        <h1>{subject}</h1>
        <div className="grid grid-cols-1  sm:grid-cols-3  gap-10 sm:gap-15 text-gray-700 ">
          <Link
            to={`/app/flashcards/${subject}`}
            className="flex flex-col justify-center items-center gap-2 border-1 border-gray-200 p-8 sm:w-[180px] sm:h-[180px] rounded-xl shadow-lg hover:text-purple-600  hover:translate-y-1 transition-all"
          >
            <TbCards size={80} />
            {specificSubject.flashcardsCount + " Flashcards"}
          </Link>
          <Link
            to={`/app/quizzes/${subject}`}
            className="flex flex-col justify-center items-center gap-2 border-1 border-gray-200 p-8 rounded-xl shadow-lg hover:text-purple-600 hover:translate-y-1 transition-all"
          >
            <MdOutlineQuiz size={80} />
            {specificSubject.quizzesCount + " Quizzes"}
          </Link>
          <Link
            to={`/app/notes/${subject}`}
            className="flex flex-col justify-center items-center gap-2 border-1 border-gray-200 p-8 rounded-xl shadow-lg hover:text-purple-600 hover:translate-y-1 transition-all"
          >
            <TbNotes size={80} />
            {specificSubject.quizzesCount + " Notes"}
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default SubjectsSpecific;

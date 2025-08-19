import MainButton from "../../components/MainButton";
import SecondButton from "../../components/SecondButton";
import { Link, useLocation } from "react-router-dom";

function Quiz({ title, numOfQuestions, quizData }) {
  const path = useLocation();
  return (
    <div className="rounded-xl shadow-lg m-4 px-8 py-6 pb-10 text-center flex flex-col justify-between gap-4 border-1 border-gray-200">
      <div>
        <p className="text-purple-600">{numOfQuestions} questions</p>
        <h2 className="mb-6 mt-2">{title}</h2>
      </div>
      <div className="flex flex-col justify-between items-center gap-5 mt-2">
        <Link to={`${path.pathname}/${title}/edit`} className="w-full">
          <SecondButton
            text={"Edit"}
            styles={"w-full max-w-[250px]"}
          ></SecondButton>
        </Link>
        <Link to={`${path.pathname}/${title}/learn`} className="w-full">
          <MainButton
            text={"Learn"}
            styles={"w-full max-w-[250px]"}
          ></MainButton>
        </Link>
      </div>
    </div>
  );
}

export default Quiz;

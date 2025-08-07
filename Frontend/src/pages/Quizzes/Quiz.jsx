import MainButton from "../../components/MainButton";
import SecondButton from "../../components/SecondButton";
import { Link, useLocation } from "react-router-dom";

function Quiz({ title, numOfQuestions, quizData }) {
  const path = useLocation();
  return (
    <div className="rounded-xl shadow-lg m-4 p-4 py-8 text-center">
      <p className="text-purple-600">{numOfQuestions} questions</p>
      <h2 className="mb-6 mt-2">{title}</h2>
      <div className="flex flex-col justify-between items-center gap-5 mt-6">
        <Link to={`${path.pathname}/${title}/edit`} className="w-full">
          <SecondButton
            text={"Edit"}
            styles={"w-full max-w-[250px]"}
          ></SecondButton>
        </Link>
        <MainButton text={"Learn"} styles={"w-full max-w-[250px]"}></MainButton>
      </div>
    </div>
  );
}

export default Quiz;

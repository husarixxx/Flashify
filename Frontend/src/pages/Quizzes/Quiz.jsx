import MainButton from "../../components/MainButton";
import SecondButton from "../../components/SecondButton";

function Quiz({ title, numOfQuestions }) {
  return (
    <div className="rounded-xl shadow-lg m-4 p-4 py-8 text-center">
      <p className="text-purple-600">{numOfQuestions} questions</p>
      <h2 className="mb-6 mt-2">{title}</h2>
      <div className="flex flex-col justify-between items-center gap-5 mt-6">
        <SecondButton
          text={"Edit"}
          styles={"w-full max-w-[250px]"}
        ></SecondButton>
        <MainButton text={"Learn"} styles={"w-full max-w-[250px]"}></MainButton>
      </div>
    </div>
  );
}

export default Quiz;

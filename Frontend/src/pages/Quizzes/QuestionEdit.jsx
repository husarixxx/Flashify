import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SecondButton from "../../components/SecondButton";
import MainButton from "../../components/MainButton";

function QuestionEdit({ question, questionNumber }) {
  return (
    <div className="rounded-xl shadow-lg px-8 py-6 flex justify-between gap-8">
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-purple-600">{question.type} question</p>
          <h3 className="mt-1 mb-8">{question.question}</h3>
        </div>
        <MainButton
          text={
            <>
              Edit <FaEdit size={22}></FaEdit>
            </>
          }
          styles={"flex justify-center items-center gap-3 px-7 w-[200px]"}
        />
      </div>
      <div className="flex flex-col justify-start">
        <button className="cursor-pointer hover:translate-y-[2px] transition-transform will-change-transform">
          <MdDelete size={32} color="red"></MdDelete>
        </button>
      </div>
    </div>
  );
}

export default QuestionEdit;

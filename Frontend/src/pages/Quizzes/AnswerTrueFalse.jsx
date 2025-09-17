function AnswerTrueFalse({ answer, onClick, isSelected }) {
  return (
    <label
      htmlFor={answer}
      className={` h-[55px] sm:h-[50px] text-xl opacity-70 transition-all font-bold text-center  shadow-sm rounded-3xl border-1  px-6 py-3 flex gap-2 justify-center items-center  peer-checked:border-red-600 hover:cursor-pointer ${
        answer === "True"
          ? "  bg-linear-to-r from-emerald-300 via-green-300 to-green-400 border-green-600 accent-green-600 text-green-700"
          : "bg-linear-to-r from-rose-300 via-red-300 to-red-400 border-red-600 accent-red-600 text-red-700"
      } ${isSelected ? "outline-1 opacity-100" : ""}`}
    >
      <input
        type="radio"
        name=""
        id={answer}
        className="w-[16px] hidden"
        checked={isSelected}
        onChange={onClick}
      />
      {answer}
    </label>
  );
}

export default AnswerTrueFalse;

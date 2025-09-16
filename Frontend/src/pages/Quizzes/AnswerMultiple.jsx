function AnswerMultiple({ answer, onClick, isSelected }) {
  return (
    <label
      htmlFor={answer}
      className=" text-right text-gray-800 shadow-sm rounded-3xl border-1 border-purple-400 px-6 py-2 flex gap-2 justify-between accent-purple-600 peer-checked:border-red-600 hover:cursor-pointer"
    >
      <input
        type="checkbox"
        name=""
        id={answer}
        className="w-[16px]"
        checked={isSelected}
        onChange={onClick}
      />
      <span className="flex justify-center items-center">{answer}</span>
    </label>
  );
}

export default AnswerMultiple;

import { useState } from "react";

function Flashcard({ definition, explanation, turnOff = false, isMoved }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button className="h-[200px] w-[100%] sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px]  text-white   perspective-distant transition-all duration-900 ease-in">
      <div
        className={`relative w-full h-full transition-transform transform-3d

   ${flipped ? "rotate-y-180  " : ""}`}
        onClick={(e) => {
          !turnOff && isMoved ? setFlipped(!flipped) : e.stopPropagation();
        }}
      >
        <div
          className={`p-4 absolute z-2 w-full h-full flex items-center justify-center bg-purple-600 rounded-2xl shadow-xl text-center backface-hidden`}
        >
          <h2>{definition}</h2>
        </div>
        <div className="absolute z-1 w-full h-full rotate-y-180  flex items-center justify-center bg-purple-600 rounded-2xl shadow-xl  text-center backface-hidden">
          <p className="text-white">{explanation}</p>
        </div>
      </div>
    </button>
  );
}
export default Flashcard;

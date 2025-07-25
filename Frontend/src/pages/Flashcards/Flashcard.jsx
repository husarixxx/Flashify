import { useState } from "react";

function Flashcard({
  definition,
  explanation,
  turnOff = false,
  isDragging,
  styles,
  flipped,
  setFlipped,
}) {
  const [startX, setStartX] = useState(0);

  function onMouseDownHandle(e) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setStartX(x);
  }
  function onMouseUpHandle(e) {
    const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    if (turnOff) return;
    if (Math.abs(x - startX) < 50) setFlipped(!flipped);
  }
  return (
    <button className="h-[200px] w-[100%] sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px]  text-white   perspective-distant  select-none">
      <div
        className={`relative w-full h-full transition-transform duration-800 transform-3d

   ${flipped ? "rotate-y-180  " : ""}`}
        onMouseDown={onMouseDownHandle}
        onMouseUp={onMouseUpHandle}
        onTouchStart={onMouseDownHandle}
        onTouchEnd={onMouseUpHandle}
      >
        <div
          className={`p-4 absolute z-2 w-full h-full flex items-center justify-center bg-purple-600 rounded-2xl shadow-xl text-center backface-hidden bg-opacity-100`}
        >
          <h2 className={`${styles} `}>{definition}</h2>
        </div>
        <div className="absolute z-1 w-full h-full rotate-y-180  flex items-center justify-center bg-purple-600 rounded-2xl shadow-xl  text-center backface-hidden">
          <p className="text-white">{explanation}</p>
        </div>
      </div>
    </button>
  );
}
export default Flashcard;

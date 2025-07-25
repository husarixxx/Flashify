import { useState, useEffect } from "react";
import { useFlashcard } from "../../context/FlashcardContext";

function Swiping({ children, isDragging, setIsDragging }) {
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const [isMoved, setIsMoved] = useState(false);
  const [angle, setAngle] = useState(0);
  const [topPos, setTopPos] = useState(0);
  const [opacity, setOpacity] = useState(100);

  const { swipe, setSwipe } = useFlashcard();

  useEffect(() => {
    function handleMouseMove(e) {
      if (!isDragging) return;

      const delta = e.clientX - startX;

      setAngle(
        Math.max(
          -45,
          Math.min((delta / (window.innerWidth < 600 ? 200 : 500)) * 45, 45)
        )
      );
      setOpacity(
        Math.max(
          0,
          Math.min(
            1,
            1 - Math.abs(delta) / (window.innerWidth < 600 ? 200 : 500)
          )
        )
      );
      setTopPos(Math.ceil(Math.abs((currentX - startX) / 4)));
      setCurrentX(e.clientX);
      setCurrentX(e.clientX);

      if (Math.abs(delta) > 50) {
        setIsMoved(true);
      } else {
        setIsMoved(false);
      }
    }

    function handleMouseUp(e) {
      e.preventDefault();
      if (!isDragging) return;
      if (opacity === 0) {
        if (currentX - startX > 0) setSwipe({ left: false, right: true });
        else setSwipe({ left: true, right: false });
      }
      setIsDragging(false);
      setAngle(0);
      setTopPos(0);
      setOpacity(1);
      setCurrentX(startX);
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startX, currentX]);

  function mouseDownHandle(e) {
    setAngle(0);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  }

  return (
    <div
      onMouseDown={mouseDownHandle}
      className={`relative h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px] z-5 bg-transparent   `}
      style={{
        left: `${currentX - startX}px`,
        top: `${topPos}px`,
        rotate: `${angle}deg`,
        opacity: `${opacity}`,
      }}
    >
      {children}
    </div>
  );
}

export default Swiping;

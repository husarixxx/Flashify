import { useState, useEffect } from "react";
import { useSwipe } from "../../context/FlashcardSwipeContext";

function Swiping({ children, isDragging, setIsDragging }) {
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const [angle, setAngle] = useState(0);
  const [topPos, setTopPos] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [animateBack, setAnimateBack] = useState();

  const { setSwipe } = useSwipe();

  useEffect(() => {
    function handleMouseMove(e) {
      const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      if (!isDragging) return;

      const delta = x - startX;

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
      setCurrentX(x);
      setCurrentX(x);
    }

    function handleMouseUp(e) {
      e.preventDefault();
      if (!isDragging) return;
      if (opacity === 0) {
        if (currentX - startX > 0) setSwipe({ left: false, right: true });
        else setSwipe({ left: true, right: false });
        setIsDragging(false);
        setAngle(0);
        setTopPos(0);
        setOpacity(1);
        setCurrentX(startX);
        setAnimateBack(false);
      } else {
        setAnimateBack(true);

        setTimeout(() => {
          setIsDragging(false);
          setAngle(0);
          setTopPos(0);
          setOpacity(1);
          setCurrentX(startX);
        }, 0);
        setTimeout(() => {
          setAnimateBack(false);
        }, 500);
      }
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleMouseMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, startX, currentX, opacity, setSwipe, setIsDragging]);

  function mouseDownHandle(e) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setAngle(0);
    setStartX(x);
    setCurrentX(x);
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  }

  return (
    <div
      onMouseDown={mouseDownHandle}
      onTouchStart={mouseDownHandle}
      className={`relative h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px] z-5 bg-transparent   ${
        animateBack ? "transition-all duration-500 ease-out" : ""
      }`}
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

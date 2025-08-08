import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Flashcard from "./Flashcard";
import MainButton from "../../components/MainButton";
import Container from "../../components/Container";
import Swiping from "./Swiping";

import shuffleArray from "../../utils/shuffleArray";

import { useFlashcard } from "../../context/FlashcardContext";
import { useParams, useLocation } from "react-router-dom";

import mySubjects from "../../exampleData";
import { useEffect, useState } from "react";

function FlashcardsLearn() {
  const { swipe, setSwipe } = useFlashcard();
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState(false);

  let params = useParams();

  const subject = params.subject;
  const subjectFiltered = Object.entries(mySubjects).filter(
    ([subject, data]) => {
      return subject === params.subject;
    }
  );
  const dataFlashcards = subjectFiltered.map(
    ([subject, data]) => data.flashcards
  )[0];

  useEffect(() => {
    setFlashcards(dataFlashcards);
  }, [dataFlashcards]);
  useEffect(() => {
    function updateIndex(swipe) {
      if (swipe.right) {
        setFlashcards((prev) => {
          const newCards = prev.filter((flashcard, idx) => index !== idx);
          if (index + 1 >= flashcards.length) {
            setIndex(0);
          }
          return newCards;
        });
      } else if (swipe.left) {
        if (index + 1 > flashcards.length - 1) setIndex(0);
        else setIndex(index + 1);
      }
    }

    if (swipe.left || swipe.right) {
      setFlipped(false);
      setTimeout(() => {
        updateIndex(swipe);
        setSwipe({ left: false, right: false });
      }, 400);
    }
  }, [flashcards, setFlashcards, swipe, setSwipe, index]);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between overflow-hidden">
      <Header></Header>
      <div className="p-4 mx-auto">
        <h1 className="my-4">{subject}</h1>
        {flashcards.length === 0 && (
          <h2 className="text-2xl lg:text-3xl my-8 lg:my-14 mx-2 ">
            <span className="text-purple-500"> That's it!</span> You’ve mastered
            this set. Want to go another round?
          </h2>
        )}
        {flashcards && flashcards.length > 0 && (
          <div className="relative ">
            <Swiping isDragging={isDragging} setIsDragging={setIsDragging}>
              {
                <div
                  className={`relative z-3 top-0 left-0 h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px]" ${
                    swipe.left || swipe.right ? "hidden" : ""
                  }`}
                >
                  <Flashcard
                    definition={
                      flashcards.length > index
                        ? flashcards[index].definition
                        : ""
                    }
                    explanation={
                      flashcards.length > index
                        ? flashcards[index].explanation
                        : ""
                    }
                    isDragging={isDragging}
                    flipped={flipped}
                    setFlipped={setFlipped}
                  ></Flashcard>
                </div>
              }
            </Swiping>

            {flashcards.length > 1 && (
              <div
                className={`absolute z-2 top-[15px] left-[-15px] sm:top-[20px] sm:left-[-20px] h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px] ${
                  swipe.left || swipe.right
                    ? "translate-x-[15px] translate-y-[-15px] sm:translate-x-[20px] sm:translate-y-[-20px] transition-transform duration-500 "
                    : ""
                }`}
              >
                <Flashcard
                  definition={
                    flashcards[
                      index + 1 > flashcards.length - 1 ? 0 : index + 1
                    ].definition
                  }
                  explanation={
                    flashcards[
                      index + 1 > flashcards.length - 1 ? 0 : index + 1
                    ].explanation
                  }
                  turnOff={true}
                  styles={` ${
                    !isDragging && !swipe.left && !swipe.right
                      ? "text-transparent"
                      : ""
                  }`}
                ></Flashcard>
              </div>
            )}
            {flashcards.length > 2 && (
              <div
                className={`absolute z-1 top-[30px] left-[-30px] sm:top-[40px] sm:left-[-40px] h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px] ${
                  swipe.left || swipe.right
                    ? "translate-x-[15px] translate-y-[-15px] sm:translate-x-[20px] sm:translate-y-[-20px] transition-transform duration-500 "
                    : ""
                }`}
              >
                <Flashcard
                  definition={
                    flashcards[
                      index + 2 > flashcards.length - 1 ? 1 : index + 2
                    ].definition
                  }
                  explanation={
                    flashcards[
                      index + 2 > flashcards.length - 1 ? 1 : index + 2
                    ].explanation
                  }
                  turnOff={true}
                ></Flashcard>
              </div>
            )}
            {flashcards.length > 0 && (
              <div
                className={`absolute z-0 top-[30px] left-[-30px] sm:top-[40px] sm:left-[-40px] h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px] opacity-0  ${
                  (swipe.left || swipe.right) &&
                  !(flashcards.length - 1 < 3 && !swipe.left)
                    ? "opacity-100 transition-opacity duration-500 "
                    : "o"
                }  ${
                  (flashcards.length < 3 && swipe.left) ||
                  (flashcards.length - 1 < 3 && swipe.right)
                    ? (flashcards.length < 2 && swipe.left) ||
                      (flashcards.length - 1 < 2 && swipe.right)
                      ? "translate-x-[30px] translate-y-[-30px] sm:translate-x-[40px] sm:translate-y-[-40px]  "
                      : "translate-x-[15px] translate-y-[-15px] sm:translate-x-[20px] sm:translate-y-[-20px] "
                    : ""
                }`}
              >
                <Flashcard
                  definition={flashcards[0].definition}
                  explanation={flashcards[0].explanation}
                  turnOff={true}
                ></Flashcard>
              </div>
            )}
          </div>
        )}

        {flashcards.length > 0 && (
          <>
            <div className="my-12 text-center">
              <p>
                {dataFlashcards.length - flashcards.length}/
                {dataFlashcards.length}
              </p>
            </div>
            <div className="w-full flex flex-col justify-center gap-5 mt-[70px] md:mt-[100px] max-w-[300px] mx-auto">
              <MainButton
                text={"Reshuffle"}
                onClick={() => setFlashcards(shuffleArray(flashcards))}
              />
            </div>
          </>
        )}
        {flashcards.length === 0 && (
          <div className="w-full flex flex-col justify-center gap-5 mt-[70px] md:mt-[100px] max-w-[300px] mx-auto">
            <MainButton
              text={"Learn again"}
              styles={"h-12"}
              onClick={() => {
                setFlashcards(dataFlashcards);
              }}
            />
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default FlashcardsLearn;

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Flashcard from "./Flashcard";
import MainButton from "../../components/MainButton";

import Swiping from "./Swiping";

import { useFlashcard } from "../../context/FlashcardContext";
import { useParams, useLocation } from "react-router-dom";

import mySubjects from "../../exampleData";
import { useEffect, useState } from "react";

function FlashcardsLearn() {
  const { swipe, setSwipe } = useFlashcard();
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  function updateIndex(flashcards) {
    if (index + 1 > flashcards.length - 1) setIndex(0);
    else setIndex(index + 1);
  }

  let params = useParams();

  const subject = params.subject;
  const subjectFiltered = Object.entries(mySubjects).filter(
    ([subject, data]) => {
      return subject === params.subject;
    }
  );
  const flashcards = subjectFiltered.map(
    ([subject, data]) => data.flashcards
  )[0];

  useEffect(() => {
    if (swipe.left || swipe.right) {
      setTimeout(() => {
        updateIndex(flashcards);
        setSwipe({ left: false, right: false });
      }, 900);
    }
  }, [flashcards, swipe]);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between overflow-hidden">
      <Header loggedIn={true} logo="../../../src/assets/flashify.png"></Header>
      <div className="p-4 mx-auto">
        <h1 className="my-4">{subject}</h1>
        <div className="relative ">
          <Swiping isDragging={isDragging} setIsDragging={setIsDragging}>
            {
              <div
                className={`relative z-3 top-0 left-0 h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px]" ${
                  swipe.left || swipe.right ? "hidden" : ""
                }`}
              >
                <Flashcard
                  definition={flashcards[index].definition}
                  explanation={flashcards[index].explanation}
                  isDragging={isDragging}
                ></Flashcard>
              </div>
            }
          </Swiping>

          <div
            className={`absolute z-2 top-[15px] left-[-15px] sm:top-[20px] sm:left-[-20px] h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px] ${
              swipe.left || swipe.right
                ? "translate-x-[15px] translate-y-[-15px] sm:translate-x-[20px] sm:translate-y-[-20px] transition-transform duration-500 "
                : ""
            }`}
          >
            <Flashcard
              definition={
                flashcards[index + 1 > flashcards.length - 1 ? 0 : index + 1]
                  .definition
              }
              explanation={
                flashcards[index + 1 > flashcards.length - 1 ? 0 : index + 1]
                  .explanation
              }
              turnOff={true}
              styles={` ${
                !isDragging && !swipe.left && !swipe.right
                  ? "text-transparent"
                  : ""
              }`}
            ></Flashcard>
          </div>
          {flashcards[2] && (
            <div
              className={`absolute z-1 top-[30px] left-[-30px] sm:top-[40px] sm:left-[-40px] h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px] ${
                swipe.left || swipe.right
                  ? "translate-x-[15px] translate-y-[-15px] sm:translate-x-[20px] sm:translate-y-[-20px] transition-transform duration-500 "
                  : ""
              }`}
            >
              <Flashcard
                definition={
                  flashcards[index + 2 > flashcards.length - 1 ? 1 : index + 2]
                    .definition
                }
                explanation={
                  flashcards[index + 2 > flashcards.length - 1 ? 1 : index + 2]
                    .explanation
                }
                turnOff={true}
              ></Flashcard>
            </div>
          )}
          {flashcards[2] && (
            <div
              className={`absolute z-0 top-[30px] left-[-30px] sm:top-[40px] sm:left-[-40px] h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px] opacity-0 ${
                swipe.left || swipe.right
                  ? "opacity-100 transition-opacity duration-800"
                  : ""
              }`}
            >
              <Flashcard
                definition={
                  flashcards[index + 2 > flashcards.length - 1 ? 1 : index + 2]
                    .definition
                }
                explanation={
                  flashcards[index + 2 > flashcards.length - 1 ? 1 : index + 2]
                    .explanation
                }
                turnOff={true}
              ></Flashcard>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col justify-center gap-5 mt-[70px] md:mt-[100px] max-w-[300px] mx-auto">
          <MainButton text={"Reshuffle"} />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default FlashcardsLearn;

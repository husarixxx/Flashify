import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Flashcard from "./Flashcard";
import MainButton from "../../components/MainButton";
import Container from "../../components/Container";
import Swiping from "./Swiping";

import shuffleArray from "../../utils/shuffleArray";

import { useSwipe } from "../../context/FlashcardSwipeContext";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useFlashcards } from "../../context/FlashcardsContext";
import useGet from "../../hooks/useGet";
import { useSubjects } from "../../context/SubjectsContext";

function FlashcardsLearn() {
  const { swipe, setSwipe } = useSwipe();
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [localFlashcards, setLocalFlashcards] = useState([]);

  let params = useParams();
  const subject = params.subject;

  const { flashcards, setFlashcards } = useFlashcards();
  const { subjects } = useSubjects();

  const currentSubjectName = subjects.filter(
    (subject) => subject.id == params.subject
  )[0].name;

  const { get, error: errorGet } = useGet();

  useEffect(() => {
    if (!(subject in flashcards)) {
      const fetchData = async () => {
        const fetchedData = await get(`subjects/${subject}/flashcards`);

        if (errorGet !== null) {
          alert(errorGet.detail[0].msg);
          return;
        }
        setFlashcards({ ...flashcards, [subject]: fetchedData });
      };

      fetchData();
    }
  }, [flashcards, errorGet, get, setFlashcards, subject]);

  useEffect(() => {
    setLocalFlashcards(flashcards[subject]);
  }, [flashcards, subject]);

  useEffect(() => {
    function updateIndex(swipe) {
      if (swipe.right) {
        setLocalFlashcards((prev) => {
          const newCards = prev.filter((flashcard, idx) => index !== idx);
          if (index + 1 >= localFlashcards.length) {
            setIndex(0);
          }
          return newCards;
        });
      } else if (swipe.left) {
        if (index + 1 > localFlashcards.length - 1) setIndex(0);
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
  }, [localFlashcards, setLocalFlashcards, swipe, setSwipe, index]);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between overflow-hidden">
      <Header></Header>
      <div className="p-4 mx-auto">
        <h1 className="my-4">{currentSubjectName}</h1>
        {localFlashcards.length === 0 && (
          <h2 className="text-2xl lg:text-3xl my-8 lg:my-14 mx-2 ">
            <span className="text-purple-500"> That's it!</span> You’ve mastered
            this set. Want to go another round?
          </h2>
        )}
        {localFlashcards && localFlashcards.length > 0 && (
          <div className="relative ">
            <Swiping isDragging={isDragging} setIsDragging={setIsDragging}>
              {
                <div
                  className={`relative z-3 top-0 left-0 h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px]" ${
                    swipe.left || swipe.right ? "hidden" : ""
                  }`}
                >
                  <Flashcard
                    question={
                      localFlashcards.length > index
                        ? localFlashcards[index].question
                        : ""
                    }
                    answer={
                      localFlashcards.length > index
                        ? localFlashcards[index].answer
                        : ""
                    }
                    isDragging={isDragging}
                    flipped={flipped}
                    setFlipped={setFlipped}
                  ></Flashcard>
                </div>
              }
            </Swiping>

            {localFlashcards.length > 1 && (
              <div
                className={`absolute z-2 top-[15px] left-[-15px] sm:top-[20px] sm:left-[-20px] h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px] ${
                  swipe.left || swipe.right
                    ? "translate-x-[15px] translate-y-[-15px] sm:translate-x-[20px] sm:translate-y-[-20px] transition-transform duration-500 "
                    : ""
                }`}
              >
                <Flashcard
                  question={
                    localFlashcards[
                      index + 1 > localFlashcards.length - 1 ? 0 : index + 1
                    ].question
                  }
                  answer={
                    localFlashcards[
                      index + 1 > localFlashcards.length - 1 ? 0 : index + 1
                    ].answer
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
            {localFlashcards.length > 2 && (
              <div
                className={`absolute z-1 top-[30px] left-[-30px] sm:top-[40px] sm:left-[-40px] h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px] ${
                  swipe.left || swipe.right
                    ? "translate-x-[15px] translate-y-[-15px] sm:translate-x-[20px] sm:translate-y-[-20px] transition-transform duration-500 "
                    : ""
                }`}
              >
                <Flashcard
                  question={
                    localFlashcards[
                      index + 2 > localFlashcards.length - 1 ? 1 : index + 2
                    ].question
                  }
                  answer={
                    localFlashcards[
                      index + 2 > localFlashcards.length - 1 ? 1 : index + 2
                    ].answer
                  }
                  turnOff={true}
                ></Flashcard>
              </div>
            )}
            {localFlashcards.length > 0 && (
              <div
                className={`absolute z-0 top-[30px] left-[-30px] sm:top-[40px] sm:left-[-40px] h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px] opacity-0  ${
                  (swipe.left || swipe.right) &&
                  !(localFlashcards.length - 1 < 3 && !swipe.left)
                    ? "opacity-100 transition-opacity duration-500 "
                    : "o"
                }  ${
                  (localFlashcards.length < 3 && swipe.left) ||
                  (localFlashcards.length - 1 < 3 && swipe.right)
                    ? (localFlashcards.length < 2 && swipe.left) ||
                      (localFlashcards.length - 1 < 2 && swipe.right)
                      ? "translate-x-[30px] translate-y-[-30px] sm:translate-x-[40px] sm:translate-y-[-40px]  "
                      : "translate-x-[15px] translate-y-[-15px] sm:translate-x-[20px] sm:translate-y-[-20px] "
                    : ""
                }`}
              >
                <Flashcard
                  question={localFlashcards[0].question}
                  answer={localFlashcards[0].answer}
                  turnOff={true}
                ></Flashcard>
              </div>
            )}
          </div>
        )}

        {localFlashcards.length > 0 && (
          <>
            <div className="my-12 text-center">
              <p>
                {flashcards[subject].length - localFlashcards.length}/
                {flashcards[subject].length}
              </p>
            </div>
            <div className="w-full flex flex-col justify-center gap-5 mt-[70px] md:mt-[100px] max-w-[300px] mx-auto">
              <MainButton
                text={"Reshuffle"}
                onClick={() =>
                  setLocalFlashcards(shuffleArray(localFlashcards))
                }
              />
            </div>
          </>
        )}
        {localFlashcards.length === 0 && (
          <div className="w-full flex flex-col justify-center gap-5 mt-[70px] md:mt-[100px] max-w-[300px] mx-auto">
            <MainButton
              text={"Learn again"}
              styles={"h-12"}
              onClick={() => {
                setLocalFlashcards(flashcards[subject]);
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

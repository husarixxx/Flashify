import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Flashcard from "./Flashcard";
import MainButton from "../../components/MainButton";
import SecondButton from "../../components/SecondButton";
import { Link } from "react-router-dom";

import { useParams, useLocation } from "react-router-dom";

import mySubjects from "../../exampleData";
import { useState } from "react";

function FlashcardsSet() {
  const [isLearning, setIsLearning] = useState(false);

  const switchTolearn = (e) => {
    setIsLearning(!isLearning);
  };

  let params = useParams();
  const path = useLocation();

  const subject = params.subject;
  const subjectFiltered = Object.entries(mySubjects).filter(
    ([subject, data]) => {
      return subject === params.subject;
    }
  );
  const flashcards = subjectFiltered.map(
    ([subject, data]) => data.flashcards
  )[0];

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header></Header>
      <div className="p-4 mx-auto">
        <h1 className="my-4 ">{subject}</h1>
        <Link to={`${path.pathname}/learn`}>
          <div className="relative ">
            <div className="relative z-3 top-0 left-0 h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px] ">
              <Flashcard
                definition={flashcards[0].definition}
                explanation={flashcards[0].explanation}
                turnOff={true}
              ></Flashcard>
            </div>
            <div className="absolute z-2 top-[15px] left-[-15px] sm:top-[20px] sm:left-[-20px] h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px] ">
              <Flashcard
                definition={flashcards[1].definition}
                explanation={flashcards[1].explanation}
                turnOff={true}
              ></Flashcard>
            </div>
            {flashcards[2] && (
              <div className="absolute z-1 top-[30px] left-[-30px] sm:top-[40px] sm:left-[-40px] h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px]">
                <Flashcard
                  definition={flashcards[2].definition}
                  explanation={flashcards[2].explanation}
                  turnOff={true}
                ></Flashcard>
              </div>
            )}
          </div>
        </Link>

        <div className="w-full flex flex-col justify-center gap-5 mt-[70px] md:mt-[100px] max-w-[300px] mx-auto">
          <Link to={`${path.pathname}/edit`}>
            <SecondButton text={"Edit"} styles={"w-full"} />
          </Link>
          <Link to={`${path.pathname}/learn`}>
            <MainButton text={"Learn"} styles={"w-full"} />
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default FlashcardsSet;

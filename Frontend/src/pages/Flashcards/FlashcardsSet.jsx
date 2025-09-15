import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Flashcard from "./Flashcard";
import MainButton from "../../components/MainButton";
import SecondButton from "../../components/SecondButton";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useGet from "../../hooks/useGet";
import { useFlashcards } from "../../context/FlashcardsContext";
import { useSubjects } from "../../context/SubjectsContext";
function FlashcardsSet() {
  let params = useParams();
  const subject = params.subject;
  const path = useLocation();

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
        }
        setFlashcards({ ...flashcards, [subject]: fetchedData });
      };

      fetchData();
    }
  }, [flashcards, setFlashcards, get, errorGet, subject]);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header></Header>
      <div className="p-4 mx-auto">
        <h1 className="my-4 ">{currentSubjectName}</h1>
        {!(params.subject in flashcards) ? (
          "loading..."
        ) : (
          <Link to={`${path.pathname}/learn`}>
            <div className="relative ">
              {flashcards[subject][0] && (
                <div className="relative z-3 top-0 left-0 h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px] ">
                  <Flashcard
                    question={flashcards[subject][0].question}
                    answer={flashcards[subject][0].answer}
                    turnOff={true}
                  ></Flashcard>
                </div>
              )}
              {flashcards[subject][1] && (
                <div className="absolute z-2 top-[15px] left-[-15px] sm:top-[20px] sm:left-[-20px] h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px] ">
                  <Flashcard
                    question={flashcards[subject][1].question}
                    answer={flashcards[subject][1].answer}
                    turnOff={true}
                  ></Flashcard>
                </div>
              )}
              {flashcards[subject][2] && (
                <div className="absolute z-1 top-[30px] left-[-30px] sm:top-[40px] sm:left-[-40px] h-[200px] w-[80vw]  sm:h-[300px] sm:w-[540px] lg:h-[350px] lg:w-[800px]">
                  <Flashcard
                    question={flashcards[subject][2].question}
                    answer={flashcards[subject][2].answer}
                    turnOff={true}
                  ></Flashcard>
                </div>
              )}
            </div>
          </Link>
        )}

        <div className="w-full flex flex-col justify-center gap-5 mt-[70px] md:mt-[100px] max-w-[300px] mx-auto">
          <Link to={`${path.pathname}/edit`}>
            <SecondButton text={"Edit"} styles={"min-w-[160px] w-full"} />
          </Link>
          {params.subject in flashcards && flashcards[subject][0] && (
            <Link to={`${path.pathname}/learn`}>
              <MainButton text={"Learn"} styles={"w-full"} />
            </Link>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default FlashcardsSet;

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Flashcard from "./Flashcard";
import MainButton from "../../components/MainButton";
import Container from "../../components/Container";
import Swiping from "./Swiping";
import { useEffect, useState } from "react";
import shuffleArray from "../../utils/shuffleArray";
import { data, Link } from "react-router-dom";

import { useParams, useLocation } from "react-router-dom";
import FlashcardEdit from "./FlashcardEdit";

import mySubjects from "../../exampleData";
import SecondButton from "../../components/SecondButton";

function FlashcardsEdit() {
  let params = useParams();
  const path = useLocation();

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState(false);

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
  }, [flashcards]);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between overflow-hidden">
      <Header loggedIn={true} logo="../../../src/assets/flashify.png"></Header>
      <div className="p-4 mx-auto mt-10">
        <h1 className="my-4">{subject}</h1>

        <div className="flex flex-col justify-center md:grid grid-cols-2 xl:grid-cols-3  gap-5 w-[80vw]">
          {flashcards.length > 0 &&
            flashcards.map((flashcard) => (
              <FlashcardEdit
                key={crypto.randomUUID()}
                definition={flashcard.definition}
              />
            ))}
        </div>
        <div className="mt-20 flex justify-center gap-3">
          <SecondButton
            text={"Create Flashcard"}
            styles={"w-[250px] h-[50px]"}
          />

          <Link to={`${path.pathname}/../learn`}>
            <MainButton text={"Learn"} styles={"w-[250px] h-[50px]"} />
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default FlashcardsEdit;

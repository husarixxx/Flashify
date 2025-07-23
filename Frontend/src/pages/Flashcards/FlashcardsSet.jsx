import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Flashcard from "./Flashcard";

import { useParams } from "react-router-dom";

import mySubjects from "../../exampleData";

function FlashcardsSet() {
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
  console.log(subjectFiltered);
  console.log(flashcards);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header loggedIn={true} logo="../../src/assets/flashify.png"></Header>
      <div className="p-4 md:mx-auto">
        <h1 className="my-4">{subject}</h1>
        <div className="relative">
          <Flashcard
            definition={flashcards[0].definition}
            explanation={flashcards[0].explanation}
          ></Flashcard>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default FlashcardsSet;

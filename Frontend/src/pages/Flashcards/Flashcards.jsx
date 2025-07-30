import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Subject from "../../components/Subject";

import MainButton from "../../components/MainButton";

// delete after creating backend
import mySubjects from "../../exampleData";

function Flashcards() {
  const flashcardsSubjects = Object.entries(mySubjects).map(
    ([subject, data]) => {
      return { subject: subject, flashcards: data.flashcards };
    }
  );

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header loggedIn={true} logo="../src/assets/flashify.png"></Header>
      <div className="mx-4 p-4 md:mx-auto max-w-[1200px] md:translate-y-[-80px]">
        <h2>My Subjects</h2>
        <div className="md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {flashcardsSubjects.map((subject) => (
            <Subject
              key={crypto.randomUUID()}
              subject={subject.subject}
              types={[subject.flashcards]}
            />
          ))}
        </div>
        <div className="flex justify-center mt-20 lg:mt-32">
          <MainButton
            text={"Create Flashcards"}
            styles={"py-2 px-6 lg:py-3 px-12"}
          ></MainButton>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Flashcards;

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Subject from "../../components/Subject";

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
      <div className="mx-4 p-4 md:mx-auto max-w-[1200px] md:translate-y-[-120px]">
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
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Flashcards;

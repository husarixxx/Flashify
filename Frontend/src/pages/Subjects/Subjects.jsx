import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SubjectList from "../../components/SubjectList";
import mySubjects from "../../exampleData";

function Subjects() {
  const subjects = Object.entries(mySubjects).map(([subject, data]) => {
    return {
      subject: subject,
      types: {
        flashcards: data.flashcards.length,
        quizzes: data.quizzes.length,
        notes: data.notes.length,
      },
    };
  });
  console.log(subjects);
  console.log(mySubjects);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header></Header>
      <SubjectList
        subjects={subjects}
        type={"global"}
        createBtnText={"Create Quizzes subject"}
      />
      <Footer></Footer>
    </div>
  );
}

export default Subjects;

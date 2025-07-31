import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SubjectList from "../../components/SubjectList";

import mySubjects from "../../exampleData";

function Quizzes() {
  const quizzesSubjects = Object.entries(mySubjects).map(([subject, data]) => {
    return { subject: subject, types: data.quizzes };
  });
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header loggedIn={true} logo="../src/assets/flashify.png"></Header>
      <SubjectList
        subjects={quizzesSubjects}
        type={"Quizzes"}
        createBtnText={"Quiz"}
      />
      <Footer></Footer>
    </div>
  );
}

export default Quizzes;

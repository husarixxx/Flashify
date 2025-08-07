import Header from "../../components/Header";
import Footer from "../../components/Footer";
import mySubjects from "../../exampleData";
import { useParams, useLocation } from "react-router-dom";
import Quiz from "./Quiz";
import MainButton from "../../components/MainButton";
import { useState } from "react";
import Modal from "../../components/Modal";

function QuizzesSet() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  let params = useParams();
  const path = useLocation();

  const subject = params.subject;
  const subjectFiltered = Object.entries(mySubjects).filter(
    ([subject, data]) => {
      return subject === params.subject;
    }
  );
  const quizzes = subjectFiltered.map(([subject, data]) => data.quizzes)[0];
  console.log(quizzes);

  function openCreateModal() {
    setIsCreateModalOpen(true);
  }
  function closeCreateModal() {
    setIsCreateModalOpen(false);
  }
  return (
    <div className="min-h-[100vh] flex flex-col justify-between ">
      <Header logo="../../src/assets/flashify.png"></Header>
      <div className="mx-4 md:mx-16 lg:mx-24 xl:mx-30">
        <h1 className="my-4 ">{subject}</h1>
        <div className="md:grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-4">
          {quizzes.map((quiz) => {
            return (
              <Quiz
                key={crypto.randomUUID()}
                quizData={quiz}
                title={quiz.title}
                numOfQuestions={quiz.questions.length}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <MainButton
          text={"Create Quiz"}
          styles={"px-12 md:px-14"}
          onClick={openCreateModal}
        ></MainButton>
      </div>
      <Footer></Footer>
      {isCreateModalOpen && (
        <Modal
          heading={
            <>
              Create <span className="text-purple-500">Quiz</span>
            </>
          }
          modalClose={closeCreateModal}
        />
      )}
    </div>
  );
}
export default QuizzesSet;

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams, useLocation } from "react-router-dom";
import mySubjects from "../../exampleData";
import QuestionLearn from "./QuestionLearn";
import { useState } from "react";
import AnswerMultiple from "./AnswerMultiple";
import SecondButton from "../../components/SecondButton";
import MainButton from "../../components/MainButton";
function QuizLearn() {
  let params = useParams();
  const path = useLocation();

  //   const subject = params.subject;
  //   const subjectFiltered = Object.entries(mySubjects).filter(
  //     ([subject, data]) => {
  //       return subject === params.subject;
  //     }
  //   );

  const subject = params.subject;
  const subjectFiltered = Object.entries(mySubjects).filter(
    ([subject, data]) => {
      return subject === params.subject;
    }
  );
  const quizzes = subjectFiltered.map(([subject, data]) => data.quizzes)[0];
  const quiz = quizzes.filter((quiz) => quiz.title === params.quizTitle)[0];
  console.log(quiz);
  const { title, questions } = quiz;

  const [currentQuesiton, setCurrentQuestion] = useState(questions[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  function nextQuestion() {
    if (currentIndex === questions.length - 1) return;
    else {
      setCurrentQuestion(questions[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
  }

  function previousQuestion() {
    if (currentIndex === 0) return;
    else {
      setCurrentQuestion(questions[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  }
  return (
    <div
      className={`min-h-[100vh] flex flex-col justify-between overflow-hidden `}
    >
      <Header></Header>
      <div className=" mx-6 md:mx-auto translate-y-[-40px] ">
        <h3 className="my-12">{title}</h3>
        <QuestionLearn
          question={currentQuesiton.question}
          questionNumber={currentIndex + 1}
          allQuestionsNumber={questions.length}
          answers={currentQuesiton.answers}
        />
        <div className="grid sm:grid-cols-2 gap-4 mt-18">
          {currentQuesiton.answers.map((answer) => (
            <AnswerMultiple answer={answer.text} />
          ))}
        </div>
        <div className="flex justify-center gap-12 my-10 md:mt-18">
          <SecondButton
            text={"Previous"}
            styles={"w-[50%]"}
            onClick={previousQuestion}
          ></SecondButton>
          <MainButton
            text={"Next"}
            styles={"w-[50%]"}
            onClick={nextQuestion}
          ></MainButton>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default QuizLearn;

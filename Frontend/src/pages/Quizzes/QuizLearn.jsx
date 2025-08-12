import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams, useLocation } from "react-router-dom";
import mySubjects from "../../exampleData";
import QuestionLearn from "./QuestionLearn";
import { useState } from "react";
import AnswerMultiple from "./AnswerMultiple";
import SecondButton from "../../components/SecondButton";
import MainButton from "../../components/MainButton";
import removeByValue from "../../utils/removeByValue";
import { Link } from "react-router-dom";

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
  const { title, questions } = quiz;

  const [currentQuesiton, setCurrentQuestion] = useState(questions[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isSubmited, setIsSubmited] = useState(false);

  function nextQuestion() {
    if (currentIndex === questions.length - 1) setIsSubmited(true);
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
  function handleSingleAnswer(index) {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = index;

    setAnswers(updatedAnswers);
  }
  function handleMultipleAnswer(index) {
    const updatedAnswers = [...answers];
    if (updatedAnswers[currentIndex] === null)
      updatedAnswers[currentIndex] = [];
    if (updatedAnswers[currentIndex].includes(index)) {
      removeByValue(updatedAnswers[currentIndex], index);
    } else updatedAnswers[currentIndex].push(index);

    setAnswers(updatedAnswers);
  }
  function countResult() {
    const maxPoints = questions.length;
    let points = 0;
    answers.forEach((answer, index) => {
      if (answer !== null) {
        if (Number.isInteger(answer)) {
          if (questions[index].answers[answer].isCorrect) points++;
        } else {
          let numOfCorrectAnswers = 0;
          questions[index].answers.forEach((innerAnswer) => {
            if (innerAnswer.isCorrect) numOfCorrectAnswers++;
          });
          let tempPoint = 0;
          answer.forEach((answerIndex) => {
            if (questions[index].answers[answerIndex].isCorrect)
              tempPoint = tempPoint + 1 / numOfCorrectAnswers;
            else tempPoint = tempPoint - 1 / numOfCorrectAnswers;
          });
          points = points + Math.max(0, tempPoint);
        }
      }
    });
    return {
      points: points,
      maxPoints: maxPoints,
      percentage: (points / maxPoints) * 100,
    };
  }

  function resetQuiz() {
    setCurrentQuestion(questions[0]);
    setCurrentIndex(0);
    setAnswers(Array(questions.length).fill(null));
    setIsSubmited(false);
  }

  function getResultMessage(percentage) {
    if (percentage >= 90) return "Outstanding! You absolutely nailed it!";
    if (percentage >= 75) return "Great job! You really know your stuff.";
    if (percentage >= 60)
      return "Good work! A little more practice and you'll master it.";
    if (percentage >= 40) return "Not bad! Keep learning and you'll get there.";
    if (percentage >= 20)
      return "Don't give up! Review the material and try again.";
    return "Tough one, huh? Time to hit the books and give it another go!";
  }
  const result = countResult();

  return (
    <div
      className={`min-h-[100vh] flex flex-col justify-between overflow-hidden `}
    >
      <Header></Header>
      <div className=" mx-6 md:mx-auto translate-y-[-40px] ">
        {isSubmited ? (
          <div className="max-w-[750px]">
            <h1>
              Your got{" "}
              <span className="text-purple-600">{result.percentage}%</span>
              {". "}
              {getResultMessage(result.percentage)}
            </h1>
            <p>You can do again this quiz or try your skills on others</p>
            <div className="flex flex-col gap-6 my-8 sm:flex-row justify-center items-center">
              <Link to="/app/quizzes">
                <SecondButton
                  text={"Explore Other Quizzes"}
                  styles={"w-full sm:max-w-[270px]"}
                ></SecondButton>
              </Link>

              <MainButton
                text={"Retry This Quiz"}
                styles={"w-full sm:max-w-[270px]"}
                onClick={resetQuiz}
              ></MainButton>
            </div>
          </div>
        ) : (
          <>
            <h3 className="my-12">{title}</h3>
            <QuestionLearn
              question={currentQuesiton.question}
              questionNumber={currentIndex + 1}
              allQuestionsNumber={questions.length}
              answers={currentQuesiton.answers}
            />
            <div className="grid sm:grid-cols-2 gap-4 mt-18">
              {currentQuesiton.answers.map((answer, index) => (
                <AnswerMultiple
                  answer={answer.text}
                  onClick={() => handleMultipleAnswer(index)}
                  isSelected={
                    answers[currentIndex] !== null
                      ? answers[currentIndex].includes(index)
                      : false
                  }
                />
              ))}
            </div>
            <div className="flex justify-center gap-12 my-10 md:mt-18">
              <SecondButton
                text={"Previous"}
                styles={`w-[50%] ${currentIndex === 0 ? "invisible" : ""}`}
                onClick={previousQuestion}
              ></SecondButton>
              <MainButton
                text={
                  currentIndex === questions.length - 1 ? "Submit Quiz" : "Next"
                }
                styles={`w-[50%] `}
                onClick={nextQuestion}
              ></MainButton>
            </div>
          </>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default QuizLearn;

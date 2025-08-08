import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import MainButton from "../../components/MainButton";
import SecondButton from "../../components/SecondButton";
import QuestionEdit from "./QuestionEdit";
import { useParams, useLocation } from "react-router-dom";
import mySubjects from "../../exampleData";

function QuizEdit() {
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
  console.log(quizzes);
  console.log(params.quizTitle);
  console.log(title);
  console.log(questions);
  console.log(questions.length);

  return (
    <div
      className={`min-h-[100vh] flex flex-col justify-between overflow-hidden `}
    >
      <Header></Header>
      <div className="p-4 mx-auto mt-10 md:translate-y-[-80px]">
        <h2 className="my-4">{title}</h2>

        <div className="flex flex-col justify-center md:grid grid-cols-2 xl:grid-cols-3  gap-8 w-[80vw] px-4">
          {questions.length > 0 &&
            questions.map((question, index) => (
              <QuestionEdit
                key={crypto.randomUUID()}
                question={question}
                questionNumber={index + 1}
              />
            ))}
        </div>
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-6">
          <SecondButton
            text={"Create Question"}
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

export default QuizEdit;

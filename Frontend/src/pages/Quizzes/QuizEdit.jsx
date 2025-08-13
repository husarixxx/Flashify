import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import MainButton from "../../components/MainButton";
import SecondButton from "../../components/SecondButton";
import QuestionEdit from "./QuestionEdit";
import { useParams, useLocation } from "react-router-dom";
import mySubjects from "../../exampleData";
import Modal from "../../components/Modal";
import Form from "../../components/Form";
import { useState } from "react";

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
  const { title, questions } = quiz;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  function openCreateModal() {
    setIsCreateModalOpen(true);
  }
  function closeCreateModal() {
    setIsCreateModalOpen(false);
  }

  const [createInputs, setCreateInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "Question",
      onChange: handleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      value: "Single choice",
      label: "Single choice",
      checked: true,
      onChange: handleRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      value: "Multiple choice",
      label: "Multiple choice",
      checked: false,
      onChange: handleRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      value: "True or False",
      label: "True or False",
      checked: false,
      onChange: handleRadioOnChange,
    },
  ]);

  const singleInputs = [
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "A",
      onChange: handleAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "B",
      onChange: handleAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "C",
      onChange: handleAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "D",
      onChange: handleAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "A",
      label: "A",
      checked: true,
      onChange: handleCorrectRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "B",
      label: "B",
      checked: false,
      onChange: handleCorrectRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      name: "Correct answer",
      value: "C",
      label: "C",
      checked: false,
      onChange: handleCorrectRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      name: "Correct answer",
      value: "D",
      label: "D",
      checked: false,
      onChange: handleCorrectRadioOnChange,
    },
  ];

  const multipleInputs = [
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "A",
      onChange: handleAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "B",
      onChange: handleAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "C",
      onChange: handleAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "D",
      onChange: handleAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "checkbox",
      value: "A",
      label: "A",
      checked: true,
      onChange: handleCorrectCheckboxOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "checkbox",
      value: "B",
      label: "B",
      checked: false,
      onChange: handleCorrectCheckboxOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "checkbox",
      name: "Correct answer",
      value: "C",
      label: "C",
      checked: false,
      onChange: handleCorrectCheckboxOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "checkbox",
      name: "Correct answer",
      value: "D",
      label: "D",
      checked: false,
      onChange: handleCorrectCheckboxOnChange,
    },
  ];
  const trueFalseInputs = [
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "True",
      onChange: handleAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "False",
      onChange: handleAnswerOnChange,
    },

    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "True",
      label: "True",
      checked: true,
      onChange: handleCorrectRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "False",
      label: "False",
      checked: false,
      onChange: handleCorrectRadioOnChange,
    },
  ];
  const [createAdditionalInputs, setCreateAdditionalInputs] =
    useState(singleInputs);

  function handleOnChange(e, id) {
    setCreateInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleRadioOnChange(e) {
    setCreateInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "radio" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input, checked: false };
      })
    );
    console.log("haloo");
    switchQuestionType(e);
  }
  function handleAnswerOnChange(e, id) {
    setCreateAdditionalInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleCorrectRadioOnChange(e) {
    setCreateAdditionalInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "radio" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input, checked: false };
      })
    );
  }
  function handleCorrectCheckboxOnChange(e) {
    setCreateAdditionalInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "checkbox" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input };
      })
    );
  }

  function switchQuestionType(e) {
    const checkedInput = e.target.value;
    console.log(`CheckedInput: ${checkedInput.value}`);
    if (checkedInput === "Single choice")
      setCreateAdditionalInputs(singleInputs);
    else if (checkedInput === "Multiple choice")
      setCreateAdditionalInputs(multipleInputs);
    else if (checkedInput === "True or False")
      setCreateAdditionalInputs(trueFalseInputs);

    console.log(createInputs);
  }

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
            onClick={openCreateModal}
          />

          <Link to={`${path.pathname}/../learn`}>
            <MainButton text={"Learn"} styles={"w-[250px] h-[50px]"} />
          </Link>
        </div>
      </div>
      {isCreateModalOpen && (
        <Modal
          heading={
            <>
              Create <span className="text-purple-600">question</span>
            </>
          }
          modalClose={closeCreateModal}
        >
          <Form
            inputs={createInputs}
            submitText={"Create question"}
            radioLegend="Type of question"
            additionalInputs={createAdditionalInputs}
          ></Form>
        </Modal>
      )}
      <Footer></Footer>
    </div>
  );
}

export default QuizEdit;

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import mySubjects from "../../exampleData";
import { useParams } from "react-router-dom";
import Quiz from "./Quiz";
import MainButton from "../../components/MainButton";
import { useState } from "react";
import Modal from "../../components/Modal";
import Form from "../../components/Form";

function QuizzesSet() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  let params = useParams();

  const subject = params.subject;
  const subjectFiltered = Object.entries(mySubjects).filter(
    ([subject, data]) => {
      return subject === params.subject;
    }
  );
  const quizzes = subjectFiltered.map(([subject, data]) => data.quizzes)[0];

  const [createQuizInputs, setCreateQuizInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "Name",
      onChange: handleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      value: "Empty",
      label: "Empty",
      checked: true,
      onChange: handleRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      value: "With AI",
      label: "With AI",
      checked: false,
      onChange: handleRadioOnChange,
    },
  ]);

  const [aiCreateInputs, setAiCreateInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "Topic",
      onChange: handleOnChangeAI,
    },
    {
      id: crypto.randomUUID(),
      type: "number",
      value: "",
      label: "Number of questions",

      onChange: handleOnChangeAI,
    },
    {
      id: crypto.randomUUID(),
      type: "checkbox",
      value: "Single choice",
      label: "Single choice",
      checked: false,
      onChange: handleCheckboxOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "checkbox",
      value: "Multiple choice",
      label: "Multiple choice",
      checked: false,
      onChange: handleCheckboxOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "checkbox",
      value: "True or False",
      label: "True or False",
      checked: false,
      onChange: handleCheckboxOnChange,
    },
  ]);

  function handleOnChange(e, id) {
    setCreateQuizInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleOnChangeAI(e, id) {
    setAiCreateInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }

  function handleRadioOnChange(e) {
    setCreateQuizInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "radio" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input, checked: false };
      })
    );
  }
  function handleCheckboxOnChange(e) {
    setAiCreateInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "checkbox" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input };
      })
    );
  }

  function isWithAiChosen() {
    return createQuizInputs.filter((input) => input.label === "With AI")[0]
      .checked;
  }

  function openCreateModal() {
    setIsCreateModalOpen(true);
  }
  function closeCreateModal() {
    setIsCreateModalOpen(false);
  }
  return (
    <div className="min-h-[100vh] flex flex-col justify-between ">
      <Header></Header>
      <div className="mx-4 md:mx-16 lg:mx-24 xl:mx-30 mt-12">
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
      <div className="flex justify-center my-12">
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
        >
          <Form
            inputs={createQuizInputs}
            submitText={"Create"}
            radioLegend={"Creation Type"}
            additionalInputs={isWithAiChosen() ? aiCreateInputs : null}
            checkboxLegend={"Types of questions"}
          ></Form>
        </Modal>
      )}
    </div>
  );
}
export default QuizzesSet;

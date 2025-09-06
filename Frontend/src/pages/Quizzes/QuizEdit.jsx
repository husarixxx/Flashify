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
import { useEffect, useState } from "react";
import { useQuizzes } from "../../context/QuizzesContext";
import useGet from "../../hooks/useGet";

function QuizEdit() {
  let params = useParams();
  const path = useLocation();
  const subject = params.subject;

  //   const subject = params.subject;
  //   const subjectFiltered = Object.entries(mySubjects).filter(
  //     ([subject, data]) => {
  //       return subject === params.subject;
  //     }
  //   );

  // const subject = params.subject;
  // const subjectFiltered = Object.entries(mySubjects).filter(
  //   ([subject, data]) => {
  //     return subject === params.subject;
  //   }
  // );
  // const quizzes = subjectFiltered.map(([subject, data]) => data.quizzes)[0];

  const { quizzes, setQuizzes } = useQuizzes();

  const { get, loading, error } = useGet();

  useEffect(() => {
    if (!(subject in quizzes)) {
      const fetchData = async () => {
        const fetchedData = await get(`subjects/${subject}/quizzes`);
        console.log("fetchedData: ", fetchedData);
        setQuizzes({ ...quizzes, [subject]: fetchedData });
      };

      fetchData();
    }
  }, [subject, quizzes, setQuizzes]);

  const quiz = quizzes[subject].filter(
    (quiz) => quiz.title === params.quizTitle
  )[0];
  const { title, questions } = quiz;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function openCreateModal() {
    setIsCreateModalOpen(true);
  }
  function closeCreateModal() {
    setIsCreateModalOpen(false);
  }
  function openEditModal() {
    setIsEditModalOpen(true);
  }
  function closeEditModal() {
    setIsEditModalOpen(false);
  }

  const [createInputs, setCreateInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "Question",
      onChange: handleCreateOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      value: "Single choice",
      label: "Single choice",
      checked: true,
      onChange: handleCreateRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      value: "Multiple choice",
      label: "Multiple choice",
      checked: false,
      onChange: handleCreateRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      value: "True or False",
      label: "True or False",
      checked: false,
      onChange: handleCreateRadioOnChange,
    },
  ]);

  const [editInputs, setEditInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "Question",
      onChange: handleEditOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      value: "Single choice",
      label: "Single choice",
      checked: true,
      onChange: handleEditRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      value: "Multiple choice",
      label: "Multiple choice",
      checked: false,
      onChange: handleEditRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      value: "True or False",
      label: "True or False",
      checked: false,
      onChange: handleEditRadioOnChange,
    },
  ]);

  const createSingleInputs = [
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "A",
      onChange: handleCreateAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "B",
      onChange: handleCreateAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "C",
      onChange: handleCreateAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "D",
      onChange: handleCreateAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "A",
      label: "A",
      checked: true,
      onChange: handleCreateCorrectRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "B",
      label: "B",
      checked: false,
      onChange: handleCreateCorrectRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      name: "Correct answer",
      value: "C",
      label: "C",
      checked: false,
      onChange: handleCreateCorrectRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      name: "Correct answer",
      value: "D",
      label: "D",
      checked: false,
      onChange: handleCreateCorrectRadioOnChange,
    },
  ];

  const createMultipleInputs = [
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "A",
      onChange: handleCreateAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "B",
      onChange: handleCreateAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "C",
      onChange: handleCreateAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "D",
      onChange: handleCreateAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "checkbox",
      value: "A",
      label: "A",
      checked: true,
      onChange: handleCreateCorrectCheckboxOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "checkbox",
      value: "B",
      label: "B",
      checked: false,
      onChange: handleCreateCorrectCheckboxOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "checkbox",
      name: "Correct answer",
      value: "C",
      label: "C",
      checked: false,
      onChange: handleCreateCorrectCheckboxOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "checkbox",
      name: "Correct answer",
      value: "D",
      label: "D",
      checked: false,
      onChange: handleCreateCorrectCheckboxOnChange,
    },
  ];
  const createTrueFalseInputs = [
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "True",
      onChange: handleCreateAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "False",
      onChange: handleCreateAnswerOnChange,
    },

    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "True",
      label: "True",
      checked: true,
      onChange: handleCreateCorrectRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "False",
      label: "False",
      checked: false,
      onChange: handleCreateCorrectRadioOnChange,
    },
  ];

  const editSingleInputs = [
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "A",
      onChange: handleEditAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "B",
      onChange: handleEditAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "C",
      onChange: handleEditAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "D",
      onChange: handleEditAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "A",
      label: "A",
      checked: true,
      onChange: handleEditCorrectRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "B",
      label: "B",
      checked: false,
      onChange: handleEditCorrectRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      name: "Correct answer",
      value: "C",
      label: "C",
      checked: false,
      onChange: handleEditCorrectRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      name: "Correct answer",
      value: "D",
      label: "D",
      checked: false,
      onChange: handleEditCorrectRadioOnChange,
    },
  ];

  const editMultipleInputs = [
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "A",
      onChange: handleEditAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "B",
      onChange: handleEditAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "C",
      onChange: handleEditAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "D",
      onChange: handleEditAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "checkbox",
      value: "A",
      label: "A",
      checked: true,
      onChange: handleEditCorrectCheckboxOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "checkbox",
      value: "B",
      label: "B",
      checked: false,
      onChange: handleEditCorrectCheckboxOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "checkbox",
      name: "Correct answer",
      value: "C",
      label: "C",
      checked: false,
      onChange: handleEditCorrectCheckboxOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "checkbox",
      name: "Correct answer",
      value: "D",
      label: "D",
      checked: false,
      onChange: handleEditCorrectCheckboxOnChange,
    },
  ];
  const editTrueFalseInputs = [
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "True",
      onChange: handleEditAnswerOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "False",
      onChange: handleEditAnswerOnChange,
    },

    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "True",
      label: "True",
      checked: true,
      onChange: handleEditCorrectRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "False",
      label: "False",
      checked: false,
      onChange: handleEditCorrectRadioOnChange,
    },
  ];

  const [createAdditionalInputs, setCreateAdditionalInputs] =
    useState(createSingleInputs);

  const [editAdditionalInputs, setEditAdditionalInputs] =
    useState(editSingleInputs);

  function handleCreateOnChange(e, id) {
    setCreateInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleCreateRadioOnChange(e) {
    setCreateInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "radio" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input, checked: false };
      })
    );
    console.log("haloo");
    switchCreateQuestionType(e);
  }
  function handleCreateAnswerOnChange(e, id) {
    setCreateAdditionalInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleCreateCorrectRadioOnChange(e) {
    setCreateAdditionalInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "radio" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input, checked: false };
      })
    );
  }
  function handleCreateCorrectCheckboxOnChange(e) {
    setCreateAdditionalInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "checkbox" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input };
      })
    );
  }

  function switchCreateQuestionType(e) {
    const checkedInput = e.target.value;
    console.log(`CheckedInput: ${checkedInput.value}`);
    if (checkedInput === "Single choice")
      setCreateAdditionalInputs(createSingleInputs);
    else if (checkedInput === "Multiple choice")
      setCreateAdditionalInputs(createMultipleInputs);
    else if (checkedInput === "True or False")
      setCreateAdditionalInputs(createTrueFalseInputs);

    console.log(createInputs);
  }

  function handleEditOnChange(e, id) {
    setEditInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleEditRadioOnChange(e) {
    setEditInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "radio" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input, checked: false };
      })
    );
    console.log("haloo");
    switchEditQuestionType(e);
  }
  function handleEditAnswerOnChange(e, id) {
    setEditAdditionalInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleEditCorrectRadioOnChange(e) {
    setEditAdditionalInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "radio" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input, checked: false };
      })
    );
  }
  function handleEditCorrectCheckboxOnChange(e) {
    setEditAdditionalInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "checkbox" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input };
      })
    );
  }

  function switchEditQuestionType(e) {
    const checkedInput = e.target.value;
    if (checkedInput === "Single choice")
      setEditAdditionalInputs(editSingleInputs);
    else if (checkedInput === "Multiple choice")
      setEditAdditionalInputs(editMultipleInputs);
    else if (checkedInput === "True or False")
      setEditAdditionalInputs(editTrueFalseInputs);

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
                openEditModal={openEditModal}
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
      {isEditModalOpen && (
        <Modal
          heading={
            <>
              Edit <span className="text-purple-600">question</span>
            </>
          }
          modalClose={closeEditModal}
        >
          <Form
            inputs={editInputs}
            submitText={"Create question"}
            radioLegend="Type of question"
            additionalInputs={editAdditionalInputs}
          ></Form>
        </Modal>
      )}

      <Footer></Footer>
    </div>
  );
}

export default QuizEdit;

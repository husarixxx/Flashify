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
import { usePost } from "../../hooks/usePost";
import { useSubjects } from "../../context/SubjectsContext";

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
  const { post, loading: loadingPost, error: errorPost } = usePost();

  const { updateSubjects } = useSubjects();

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

  const quiz = quizzes[subject].filter((quiz) => quiz.id === params.quizId)[0];

  const { id, title, questions } = quiz;

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

  async function handleCreateQuestion(e) {
    e.preventDefault();
    const formData = createInputs.reduce((acc, input) => {
      const key = input.label.toLowerCase();
      acc[input.type === "radio" ? key.replace(" ", "_") : key] = input.error
        ? ""
        : input.type === "radio"
        ? input.checked
        : input.value;
      return acc;
    }, {});

    console.log(formData);
    const singleFormData = createSingleInputs.reduce((acc, input) => {
      const key = input.label.toLowerCase();
      acc[input.type === "radio" ? `${key}IsCorrect` : key] = input.error
        ? ""
        : input.type === "radio"
        ? input.checked
        : input.value;
      return acc;
    }, {});
    const multipleFormData = createMultipleInputs.reduce((acc, input) => {
      const key = input.label.toLowerCase();
      acc[input.type === "radio" ? `${key}IsCorrect` : key] = input.error
        ? ""
        : input.type === "radio"
        ? input.checked
        : input.value;
      return acc;
    }, {});
    const trueFalseFormData = createTrueFalseInputs.reduce((acc, input) => {
      const key = input.label.toLowerCase();
      acc[input.type === "radio" ? `${key}IsCorrect` : key] = input.error
        ? ""
        : input.type === "radio"
        ? input.checked
        : input.value;
      return acc;
    }, {});
    const newFormdata = {
      question: formData.question,
      ...(formData.single_choice
        ? singleFormData
        : formData.multiple_choice
        ? multipleFormData
        : trueFalseFormData),
    };
    console.log(newFormdata);

    function validateInputs(input, setInputs, label, type = "text") {
      if (input.value === "") {
        setInputs((prevInputs) =>
          prevInputs.map((input) => {
            return input.label === label && input.type === type
              ? { ...input, error: `${label} cannot be empty` }
              : input;
          })
        );
        isRdyToSend = false;
      } else {
        setInputs((prevInputs) =>
          prevInputs.map((input) => {
            return input.label === label && input.type === type
              ? { ...input, error: "" }
              : input;
          })
        );
      }
    }
    let isRdyToSend = true;

    const questionInput = createInputs.find(
      (input) => input.label === "Question"
    );

    validateInputs(questionInput, setCreateInputs, "Question");

    if (checkedInput === "Single choice") {
      const aSingle = createAdditionalInputs.find(
        (input) => input.label === "A" && input.type === "text"
      );
      const bSingle = createAdditionalInputs.find(
        (input) => input.label === "B" && input.type === "text"
      );
      const cSingle = createAdditionalInputs.find(
        (input) => input.label === "C" && input.type === "text"
      );
      const dSingle = createAdditionalInputs.find(
        (input) => input.label === "D" && input.type === "text"
      );
      validateInputs(aSingle, setCreateSingleInputs, "A");
      validateInputs(bSingle, setCreateSingleInputs, "B");
      validateInputs(cSingle, setCreateSingleInputs, "C");
      validateInputs(dSingle, setCreateSingleInputs, "D");
    } else if (checkedInput === "Multiple choice") {
      const aMultiple = createMultipleInputs.find(
        (input) => input.label === "A" && input.type === "text"
      );
      const bMultiple = createMultipleInputs.find(
        (input) => input.label === "B" && input.type === "text"
      );
      const cMultiple = createMultipleInputs.find(
        (input) => input.label === "C" && input.type === "text"
      );
      const dMultiple = createMultipleInputs.find(
        (input) => input.label === "D" && input.type === "text"
      );

      validateInputs(aMultiple, setCreateMultipleInputs, "A");
      validateInputs(bMultiple, setCreateMultipleInputs, "B");
      validateInputs(cMultiple, setCreateMultipleInputs, "C");
      validateInputs(dMultiple, setCreateMultipleInputs, "D");
    } else {
      const trueInput = createTrueFalseInputs.find(
        (input) => input.label === "True" && input.type === "text"
      );
      const falseInput = createTrueFalseInputs.find(
        (input) => input.label === "False" && input.type === "text"
      );
      validateInputs(trueInput, setCreateTrueFalseInputs, "True");
      validateInputs(falseInput, setCreateTrueFalseInputs, "False");
      console.log(trueInput);
      console.log(falseInput);
    }

    if (isRdyToSend) {
      const body = {
        question: newFormdata.question,
        type: checkedInput.toLowerCase().replace(" ", "-"),
        answers:
          checkedInput === "Single choice" || checkedInput === "Multiple choice"
            ? [
                { text: newFormdata.a, isCorrect: newFormdata.aIsCorrect },
                { text: newFormdata.b, isCorrect: newFormdata.bIsCorrect },
                { text: newFormdata.c, isCorrect: newFormdata.cIsCorrect },
                { text: newFormdata.d, isCorrect: newFormdata.dIsCorrect },
              ]
            : [
                {
                  text: newFormdata.true,
                  isCorrect: newFormdata.trueIsCorrect,
                },
                {
                  text: newFormdata.false,
                  isCorrect: newFormdata.falseIsCorrect,
                },
              ],
      };
      console.log(body);
      const newQuizzes = await post(
        body,
        `subjects/${subject}/quizzes/${quiz.id}/questions`
      );
      console.log("Zupelnie nowe quizzy");
      console.log(newQuizzes);

      setQuizzes({ ...quizzes, [subject]: newQuizzes });
      updateSubjects();

      console.log("loading");
      console.log(loadingPost);
      console.log("error");
      console.log(errorPost);
    } else {
      return;
    }
    closeCreateModal();

    // if (questionInput.value === "") {
    //   setCreateInputs((prevInputs) =>
    //     prevInputs.map((input) => {
    //       return input.label === "Question"
    //         ? { ...input, error: "Question cannot be empty" }
    //         : input;
    //     })
    //   );
    //   isRdyToSend = false;
    // } else {
    //   setCreateInputs((prevInputs) =>
    //     prevInputs.map((input) => {
    //       return input.label === "Question" ? { ...input, error: "" } : input;
    //     })
    //   );
    // }
    // if (aSingle.value === "") {
    //   setCreateAdditionalInputs((prevInputs) =>
    //     prevInputs.map((input) => {
    //       return input.label === "A" && input.type === "text"
    //         ? { ...input, error: "Answer cannot be empty" }
    //         : input;
    //     })
    //   );
    //   isRdyToSend = false;
    // } else {
    //   setCreateAdditionalInputs((prevInputs) =>
    //     prevInputs.map((input) => {
    //       return input.label === "A" ? { ...input, error: "" } : input;
    //     })
    //   );
    // }
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

  const [createSingleInputs, setCreateSingleInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "A",
      error: "",
      onChange: handleCreateAnswerSingleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "B",
      error: "",
      onChange: handleCreateAnswerSingleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "C",
      error: "",
      onChange: handleCreateAnswerSingleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "D",
      error: "",
      onChange: handleCreateAnswerSingleOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "A",
      label: "A",
      checked: true,
      onChange: handleCreateCorrectRadioSingleOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "B",
      label: "B",
      checked: false,
      onChange: handleCreateCorrectRadioSingleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      name: "Correct answer",
      value: "C",
      label: "C",
      checked: false,
      onChange: handleCreateCorrectRadioSingleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      name: "Correct answer",
      value: "D",
      label: "D",
      checked: false,
      onChange: handleCreateCorrectRadioSingleOnChange,
    },
  ]);

  const [createMultipleInputs, setCreateMultipleInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "A",
      error: "",
      onChange: handleCreateAnswerMultipleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "B",
      error: "",
      onChange: handleCreateAnswerMultipleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "C",
      error: "",
      onChange: handleCreateAnswerMultipleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "D",
      error: "",
      onChange: handleCreateAnswerMultipleOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "checkbox",
      value: "A",
      label: "A",
      checked: true,
      onChange: handleCreateCorrectCheckboxMultipleOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "checkbox",
      value: "B",
      label: "B",
      checked: false,
      onChange: handleCreateCorrectCheckboxMultipleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "checkbox",
      name: "Correct answer",
      value: "C",
      label: "C",
      checked: false,
      onChange: handleCreateCorrectCheckboxMultipleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "checkbox",
      name: "Correct answer",
      value: "D",
      label: "D",
      checked: false,
      onChange: handleCreateCorrectCheckboxMultipleOnChange,
    },
  ]);
  const [createTrueFalseInputs, setCreateTrueFalseInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "True",
      onChange: handleCreateAnswerTrueFalseOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "False",
      onChange: handleCreateAnswerTrueFalseOnChange,
    },

    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "True",
      label: "True",
      checked: true,
      onChange: handleCreateCorrectRadioTrueFalseOnChange,
    },
    {
      id: crypto.randomUUID(),
      name: "Correct answer",
      type: "radio",
      value: "False",
      label: "False",
      checked: false,
      onChange: handleCreateCorrectRadioTrueFalseOnChange,
    },
  ]);

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
  function handleCreateAnswerSingleOnChange(e, id) {
    setCreateSingleInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleCreateAnswerMultipleOnChange(e, id) {
    setCreateMultipleInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleCreateAnswerTrueFalseOnChange(e, id) {
    setCreateTrueFalseInputs((prevInputs) =>
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
  function handleCreateCorrectRadioSingleOnChange(e) {
    setCreateSingleInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "radio" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input, checked: false };
      })
    );
  }
  function handleCreateCorrectRadioTrueFalseOnChange(e) {
    setCreateTrueFalseInputs((prevInputs) =>
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
  function handleCreateCorrectCheckboxMultipleOnChange(e) {
    setCreateMultipleInputs((prevInputs) =>
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
    console.log(createSingleInputs);
    if (checkedInput === "Single choice")
      setCreateAdditionalInputs(createSingleInputs);
    else if (checkedInput === "Multiple choice")
      setCreateAdditionalInputs(createMultipleInputs);
    else if (checkedInput === "True or False")
      setCreateAdditionalInputs(createTrueFalseInputs);

    console.log(createInputs);
  }
  const checkedInput = createInputs.filter((input) => input.checked)[0].value;
  console.log("checkedInput");
  console.log(checkedInput);
  useEffect(() => {
    if (checkedInput === "Single choice")
      setCreateAdditionalInputs(createSingleInputs);
    else if (checkedInput === "Multiple choice")
      setCreateAdditionalInputs(createMultipleInputs);
    else if (checkedInput === "True or False")
      setCreateAdditionalInputs(createTrueFalseInputs);
  }, [
    checkedInput,
    createMultipleInputs,
    createSingleInputs,
    createTrueFalseInputs,
  ]);

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
                quizId={id}
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
            additionalInputs={
              checkedInput === "Single choice"
                ? createSingleInputs
                : checkedInput === "Multiple choice"
                ? createMultipleInputs
                : createTrueFalseInputs
            }
            onSubmit={handleCreateQuestion}
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

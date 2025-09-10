import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SecondButton from "../../components/SecondButton";
import MainButton from "../../components/MainButton";
import { useState } from "react";
import Modal from "../../components/Modal";
import useDelete from "../../hooks/useDelete";
import { useParams } from "react-router-dom";
import { useSubjects } from "../../context/SubjectsContext";
import { useQuizzes } from "../../context/QuizzesContext";
import Form from "../../components/Form";
import usePut from "../../hooks/usePut";

function QuestionEdit({ question, quizId }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const {
    deleteEntity: deleteEntity,
    loading: loadingDelete,
    error: errorDelete,
  } = useDelete();

  const { quizzes, setQuizzes } = useQuizzes();

  let params = useParams();
  const subject = params.subject;

  const { updateSubjects } = useSubjects();

  function openDeleteModal() {
    setIsDeleteOpen(true);
  }
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }
  async function handleDelete(e) {
    e.preventDefault();
    const newQuizzes = await deleteEntity(
      `subjects/${subject}/quizzes/${quizId}/questions/${question.id}`
    );
    setQuizzes({ ...quizzes, [subject]: newQuizzes });
    updateSubjects();

    if (errorDelete !== null) alert(errorDelete);

    console.log("dataDelete");
    console.log(newQuizzes);
    console.log("loadingDelete");
    console.log(loadingDelete);
    console.log("errorDelete");
    console.log(errorDelete);
    closeDeleteModal();
  }

  const { put, loading: loadingPut, error: errorPut } = usePut();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  function openEditModal() {
    setIsEditModalOpen(true);
  }
  function closeEditModal() {
    setIsEditModalOpen(false);
  }

  async function handleEditQuestion(e) {
    e.preventDefault();
    e.preventDefault();
    const formData = editInputs.reduce((acc, input) => {
      const key = input.label.toLowerCase();
      acc[input.type === "radio" ? key.replace(" ", "_") : key] = input.error
        ? ""
        : input.type === "radio"
        ? input.checked
        : input.value;
      return acc;
    }, {});
    console.log("formData");
    console.log(formData);
    const singleFormData = editSingleInputs.reduce((acc, input) => {
      const key = input.label.toLowerCase();
      acc[input.type === "radio" ? `${key}IsCorrect` : key] = input.error
        ? ""
        : input.type === "radio"
        ? input.checked
        : input.value;
      acc[`${key}Id`] = input.id;
      return acc;
    }, {});
    console.log("singleFormData");
    console.log(singleFormData);
    console.log("editMultipleInputs");
    console.log(editMultipleInputs);
    const multipleFormData = editMultipleInputs.reduce((acc, input) => {
      const key = input.label.toLowerCase();
      acc[input.type === "checkbox" ? `${key}IsCorrect` : key] = input.error
        ? ""
        : input.type === "checkbox"
        ? input.checked
        : input.value;
      acc[`${key}Id`] = input.id;
      return acc;
    }, {});
    console.log("multipleFormData");
    console.log(multipleFormData);

    const trueFalseFormData = editTrueFalseInputs.reduce((acc, input) => {
      const key = input.label.toLowerCase();
      acc[input.type === "radio" ? `${key}IsCorrect` : key] = input.error
        ? ""
        : input.type === "radio"
        ? input.checked
        : input.value;
      acc[`${key}Id`] = input.id;
      return acc;
    }, {});
    console.log("trueFalseFormData");
    console.log(trueFalseFormData);

    const newFormdata = {
      question: formData.question,
      ...(formData.single_choice
        ? singleFormData
        : formData.multiple_choice
        ? multipleFormData
        : trueFalseFormData),
    };
    console.log("newFormdata");

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

    const questionInput = editInputs.find(
      (input) => input.label === "Question"
    );

    validateInputs(questionInput, setEditInputs, "Question");

    if (checkedInput === "Single choice") {
      const aSingle = editSingleInputs.find(
        (input) => input.label === "A" && input.type === "text"
      );
      const bSingle = editSingleInputs.find(
        (input) => input.label === "B" && input.type === "text"
      );
      const cSingle = editSingleInputs.find(
        (input) => input.label === "C" && input.type === "text"
      );
      const dSingle = editSingleInputs.find(
        (input) => input.label === "D" && input.type === "text"
      );
      validateInputs(aSingle, setEditSingleInputs, "A");
      validateInputs(bSingle, setEditSingleInputs, "B");
      validateInputs(cSingle, setEditSingleInputs, "C");
      validateInputs(dSingle, setEditSingleInputs, "D");
    } else if (checkedInput === "Multiple choice") {
      const aMultiple = editMultipleInputs.find(
        (input) => input.label === "A" && input.type === "text"
      );
      const bMultiple = editMultipleInputs.find(
        (input) => input.label === "B" && input.type === "text"
      );
      const cMultiple = editMultipleInputs.find(
        (input) => input.label === "C" && input.type === "text"
      );
      const dMultiple = editMultipleInputs.find(
        (input) => input.label === "D" && input.type === "text"
      );

      validateInputs(aMultiple, setEditMultipleInputs, "A");
      validateInputs(bMultiple, setEditMultipleInputs, "B");
      validateInputs(cMultiple, setEditMultipleInputs, "C");
      validateInputs(dMultiple, setEditMultipleInputs, "D");
    } else {
      const trueInput = editTrueFalseInputs.find(
        (input) => input.label === "True" && input.type === "text"
      );
      const falseInput = editTrueFalseInputs.find(
        (input) => input.label === "False" && input.type === "text"
      );
      validateInputs(trueInput, setEditTrueFalseInputs, "True");
      validateInputs(falseInput, setEditTrueFalseInputs, "False");
      console.log(trueInput);
      console.log(falseInput);
    }

    if (isRdyToSend) {
      const body = {
        id: question.id,
        question: newFormdata.question,
        type:
          checkedInput === "Single choice" || checkedInput === "Multiple choice"
            ? checkedInput.toLowerCase().replace(" ", "-")
            : "true-false",
        answers:
          checkedInput === "Single choice" || checkedInput === "Multiple choice"
            ? [
                {
                  id: newFormdata.aId,
                  text: newFormdata.a,
                  isCorrect: newFormdata.aIsCorrect,
                },
                {
                  id: newFormdata.bId,
                  text: newFormdata.b,
                  isCorrect: newFormdata.bIsCorrect,
                },
                {
                  id: newFormdata.cId,
                  text: newFormdata.c,
                  isCorrect: newFormdata.cIsCorrect,
                },
                {
                  id: newFormdata.dId,
                  text: newFormdata.d,
                  isCorrect: newFormdata.dIsCorrect,
                },
              ]
            : [
                {
                  id: newFormdata.trueId,

                  text: newFormdata.true,
                  isCorrect: newFormdata.trueIsCorrect,
                },
                {
                  id: newFormdata.falseId,
                  text: newFormdata.false,
                  isCorrect: newFormdata.falseIsCorrect,
                },
              ],
      };
      console.log("body");
      console.log(body);
      const newQuizzes = await put(
        body,
        `subjects/${subject}/quizzes/${quizId}/questions/${question.id}`
      );
      console.log("Zupelnie nowe quizzy");
      console.log(newQuizzes);

      setQuizzes({ ...quizzes, [subject]: newQuizzes });
      updateSubjects();

      console.log("loading");
      console.log(loadingPut);
      console.log("error");
      console.log(errorPut);
    } else {
      return;
    }
    closeEditModal();
  }
  const [editInputs, setEditInputs] = useState([
    {
      id: question.id,
      type: "text",
      value: question.question,
      label: "Question",
      onChange: handleEditOnChange,
    },
    {
      type: "radio",
      value: "Single choice",
      label: "Single choice",
      checked: question.type === "single-choice",
      onChange: handleEditRadioOnChange,
    },
    {
      type: "radio",
      value: "Multiple choice",
      label: "Multiple choice",
      checked: question.type === "multiple-choice",
      onChange: handleEditRadioOnChange,
    },
    {
      type: "radio",
      value: "True or False",
      label: "True or False",
      checked: question.type === "true-false",
      onChange: handleEditRadioOnChange,
    },
  ]);
  const labels = ["A", "B", "C", "D"];

  const [editSingleInputs, setEditSingleInputs] = useState([
    ...labels.map((label, idx) => {
      return {
        id:
          question.answers[idx] != undefined
            ? question.answers[idx].id
            : crypto.randomUUID(),
        type: "text",
        value:
          question.type === "single-choice" ? question.answers[idx].text : "",
        label: label,
        onChange: handleEditAnswerSingleOnChange,
      };
    }),

    ...labels.map((label, idx) => {
      return {
        id:
          question.answers[idx] != undefined
            ? question.answers[idx].id
            : crypto.randomUUID(),
        name: "Correct answer",
        type: "radio",
        value: label,
        label: label,
        checked:
          question.type === "single-choice"
            ? question.answers[idx].isCorrect
            : idx === 0
            ? true
            : false,
        onChange: handleEditCorrectRadioSingleOnChange,
      };
    }),
  ]);
  console.log(editSingleInputs);

  // {
  //   id: crypto.randomUUID(),
  //   type: "text",
  //   value: "",
  //   label: "A",
  //   onChange: handleEditAnswerSingleOnChange,
  // },
  // {
  //   id: crypto.randomUUID(),
  //   type: "text",
  //   value: "",
  //   label: "B",
  //   onChange: handleEditAnswerSingleOnChange,
  // },
  // {
  //   id: crypto.randomUUID(),
  //   type: "text",
  //   value: "",
  //   label: "C",
  //   onChange: handleEditAnswerSingleOnChange,
  // },
  // {
  //   id: crypto.randomUUID(),
  //   type: "text",
  //   value: "",
  //   label: "D",
  //   onChange: handleEditAnswerSingleOnChange,
  // },
  //   {
  //     id: crypto.randomUUID(),
  //     name: "Correct answer",
  //     type: "radio",
  //     value: "A",
  //     label: "A",
  //     checked: true,
  //     onChange: handleEditCorrectRadioSingleOnChange,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     name: "Correct answer",
  //     type: "radio",
  //     value: "B",
  //     label: "B",
  //     checked: false,
  //     onChange: handleEditCorrectRadioSingleOnChange,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     type: "radio",
  //     name: "Correct answer",
  //     value: "C",
  //     label: "C",
  //     checked: false,
  //     onChange: handleEditCorrectRadioSingleOnChange,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     type: "radio",
  //     name: "Correct answer",
  //     value: "D",
  //     label: "D",
  //     checked: false,
  //     onChange: handleEditCorrectRadioSingleOnChange,
  //   },

  console.log(question.answers);
  const [editMultipleInputs, setEditMultipleInputs] = useState([
    ...labels.map((label, idx) => {
      return {
        id:
          question.answers[idx] != undefined
            ? question.answers[idx].id
            : crypto.randomUUID(),
        type: "text",
        value:
          question.type === "multiple-choice" ? question.answers[idx].text : "",
        label: label,
        onChange: handleEditAnswerMultipleOnChange,
      };
    }),

    ...labels.map((label, idx) => {
      return {
        id:
          question.answers[idx] != undefined
            ? question.answers[idx].id
            : crypto.randomUUID(),
        name: "Correct answer",
        type: "checkbox",
        value: label,
        label: label,
        checked:
          question.type === "multiple-choice"
            ? question.answers[idx].isCorrect
            : idx === 0
            ? true
            : false,
        onChange: handleEditCorrectCheckboxMultipleOnChange,
      };
    }),
  ]);
  console.log(editMultipleInputs);
  // {
  //   id: crypto.randomUUID(),
  //   type: "text",
  //   value: "",
  //   label: "A",
  //   onChange: handleEditAnswerMultipleOnChange,
  // },
  // {
  //   id: crypto.randomUUID(),
  //   type: "text",
  //   value: "",
  //   label: "B",
  //   onChange: handleEditAnswerMultipleOnChange,
  // },
  // {
  //   id: crypto.randomUUID(),
  //   type: "text",
  //   value: "",
  //   label: "C",
  //   onChange: handleEditAnswerMultipleOnChange,
  // },
  // {
  //   id: crypto.randomUUID(),
  //   type: "text",
  //   value: "",
  //   label: "D",
  //   onChange: handleEditAnswerMultipleOnChange,
  // },
  // {
  //   id: crypto.randomUUID(),
  //   name: "Correct answer",
  //   type: "checkbox",
  //   value: "A",
  //   label: "A",
  //   checked: true,
  //   onChange: handleEditCorrectCheckboxMultipleOnChange,
  // },
  // {
  //   id: crypto.randomUUID(),
  //   name: "Correct answer",
  //   type: "checkbox",
  //   value: "B",
  //   label: "B",
  //   checked: false,
  //   onChange: handleEditCorrectCheckboxMultipleOnChange,
  // },
  // {
  //   id: crypto.randomUUID(),
  //   type: "checkbox",
  //   name: "Correct answer",
  //   value: "C",
  //   label: "C",
  //   checked: false,
  //   onChange: handleEditCorrectCheckboxMultipleOnChange,
  // },
  // {
  //   id: crypto.randomUUID(),
  //   type: "checkbox",
  //   name: "Correct answer",
  //   value: "D",
  //   label: "D",
  //   checked: false,
  //   onChange: handleEditCorrectCheckboxMultipleOnChange,
  // },

  const trueFalseLabels = ["True", "False"];

  const [editTrueFalseInputs, setEditTrueFalseInputs] = useState([
    ...trueFalseLabels.map((label, idx) => {
      return {
        id:
          question.answers[idx] != undefined
            ? question.answers[idx].id
            : crypto.randomUUID(),
        type: "text",
        value: question.type === "true-false" ? question.answers[idx].text : "",
        label: label,
        onChange: handleEditAnswerTrueFalseOnChange,
      };
    }),
    //przy zmianie na true false wyskakuje blad bo nie usuwaja sie nadmiarowe inputy
    ...trueFalseLabels.map((label, idx) => {
      return {
        id:
          question.answers[idx] != undefined
            ? question.answers[idx].id
            : crypto.randomUUID(),
        name: "Correct answer",
        type: "radio",
        value: question.type === "true-false" ? question.answers[idx].text : "",
        label: label,
        checked:
          question.type === "true-false"
            ? question.answers[idx].isCorrect
            : idx === 0
            ? true
            : false,
        onChange: handleEditCorrectRadioTrueFalseOnChange,
      };
    }),
    // {
    //   id: crypto.randomUUID(),
    //   type: "text",
    //   value: "",
    //   label: "True",
    //   onChange: handleEditAnswerTrueFalseOnChange,
    // },
    // {
    //   id: crypto.randomUUID(),
    //   type: "text",
    //   value: "",
    //   label: "False",
    //   onChange: handleEditAnswerTrueFalseOnChange,
    // },

    // {
    //   id: crypto.randomUUID(),
    //   name: "Correct answer",
    //   type: "radio",
    //   value: "True",
    //   label: "True",
    //   checked: true,
    //   onChange: handleEditCorrectRadioTrueFalseOnChange,
    // },
    // {
    //   id: crypto.randomUUID(),
    //   name: "Correct answer",
    //   type: "radio",
    //   value: "False",
    //   label: "False",
    //   checked: false,
    //   onChange: handleEditCorrectRadioTrueFalseOnChange,
    // },
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
  }
  function handleEditAnswerOnChange(e, id) {
    setEditAdditionalInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleEditAnswerSingleOnChange(e, id) {
    setEditSingleInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleEditAnswerMultipleOnChange(e, id) {
    setEditMultipleInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleEditAnswerTrueFalseOnChange(e, id) {
    setEditTrueFalseInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  // function handleEditCorrectRadioOnChange(e) {
  //   setEditAdditionalInputs((prevInputs) =>
  //     prevInputs.map((input) => {
  //       return input.type === "radio" && input.value === e.target.value
  //         ? { ...input, checked: e.target.checked }
  //         : { ...input, checked: false };
  //     })
  //   );
  // }
  function handleEditCorrectRadioSingleOnChange(e) {
    setEditSingleInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "radio" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input, checked: false };
      })
    );
  }
  function handleEditCorrectRadioTrueFalseOnChange(e) {
    setEditTrueFalseInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "radio" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input, checked: false };
      })
    );
  }
  // function handleEditCorrectCheckboxOnChange(e) {
  //   setEditAdditionalInputs((prevInputs) =>
  //     prevInputs.map((input) => {
  //       return input.type === "checkbox" && input.value === e.target.value
  //         ? { ...input, checked: e.target.checked }
  //         : { ...input };
  //     })
  //   );
  // }
  function handleEditCorrectCheckboxMultipleOnChange(e) {
    setEditMultipleInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "checkbox" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input };
      })
    );
  }

  // function switchEditQuestionType(e) {
  //   const checkedInput = e.target.value;
  //   if (checkedInput === "Single choice")
  //     setEditAdditionalInputs(editSingleInputs);
  //   else if (checkedInput === "Multiple choice")
  //     setEditAdditionalInputs(editMultipleInputs);
  //   else if (checkedInput === "True or False")
  //     setEditAdditionalInputs(editTrueFalseInputs);

  //   console.log(createInputs);
  // }
  console.log(" checkedInput checkedInput checkedInput !!!");
  console.log(editInputs);
  console.log("  question  question question !!!");
  console.log(question);
  const checkedInput = editInputs.filter((input) => input.checked)[0].value;
  console.log(" checkedInput checkedInput checkedInput !!!");
  console.log(checkedInput);

  return (
    <div className="rounded-xl shadow-lg px-5 md:px-8 py-5 md:py-6 flex justify-between gap-3 md:gap-8">
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-purple-600">
            {question.type.replace("-", " ")} question
          </p>
          <h3 className="mt-1 mb-8">{question.question}</h3>
        </div>
        <MainButton
          text={
            <>
              Edit <FaEdit size={22}></FaEdit>
            </>
          }
          onClick={openEditModal}
          styles={"flex justify-center items-center gap-3 px-2 max-w-[200px]"}
        />
      </div>
      <div className="flex flex-col justify-start">
        <button
          onClick={openDeleteModal}
          className="cursor-pointer hover:translate-y-[2px] transition-transform will-change-transform"
        >
          <MdDelete size={32} color="red"></MdDelete>
        </button>
      </div>

      {isDeleteOpen && (
        <Modal heading={"Delete Question"} modalClose={closeDeleteModal}>
          <p>Are you sure you want to delete this question</p>
          <div className="flex gap-4 justify-end mt-6">
            <button
              className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
              onClick={closeDeleteModal}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white px-5 py-2 rounded-md cursor-pointer opacity-85  hover:opacity-100 transition-opacity"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
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
            submitText={"Edit question"}
            radioLegend="Type of question"
            onSubmit={handleEditQuestion}
            additionalInputs={
              checkedInput === "Single choice"
                ? editSingleInputs
                : checkedInput === "Multiple choice"
                ? editMultipleInputs
                : editTrueFalseInputs
            }
          ></Form>
        </Modal>
      )}
    </div>
  );
}

export default QuestionEdit;

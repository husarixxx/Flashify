import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import MainButton from "../../components/MainButton";
import { useState } from "react";
import Modal from "../../components/Modal";
import useDelete from "../../hooks/useDelete";
import { useParams } from "react-router-dom";
import { useSubjects } from "../../context/SubjectsContext";
import { useQuizzes } from "../../context/QuizzesContext";
import Form from "../../components/Form";
import usePut from "../../hooks/usePut";

function QuestionEdit({ question }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { deleteEntity: deleteEntity, error: errorDelete } = useDelete();

  const { updateQuizzes } = useQuizzes();

  let params = useParams();
  const subject = params.subject;
  const quizId = params.quizId;

  const { updateSubjects } = useSubjects();

  function openDeleteModal() {
    setIsDeleteOpen(true);
  }
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }
  async function handleDelete(e) {
    e.preventDefault();
    await deleteEntity(
      `subjects/${subject}/quizzes/${quizId}/questions/${question.id}`
    );
    updateQuizzes(subject);
    updateSubjects();

    if (errorDelete !== null) alert(errorDelete);

    closeDeleteModal();
  }

  const { put, error: errorPut } = usePut();

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

    const newFormdata = {
      question: formData.question,
      ...(formData.single_choice
        ? singleFormData
        : formData.multiple_choice
        ? multipleFormData
        : trueFalseFormData),
    };

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
    }

    if (isRdyToSend) {
      const body = {
        question: newFormdata.question,
        type:
          checkedInput === "Single choice" || checkedInput === "Multiple choice"
            ? checkedInput.toLowerCase().replace(" ", "-")
            : "true-false",
        answers:
          checkedInput === "Single choice" || checkedInput === "Multiple choice"
            ? [
                {
                  text: newFormdata.a,
                  is_correct: newFormdata.aIsCorrect,
                },
                {
                  text: newFormdata.b,
                  is_correct: newFormdata.bIsCorrect,
                },
                {
                  text: newFormdata.c,
                  is_correct: newFormdata.cIsCorrect,
                },
                {
                  text: newFormdata.d,
                  is_correct: newFormdata.dIsCorrect,
                },
              ]
            : [
                {
                  text: "True",
                  is_correct: newFormdata.trueIsCorrect,
                },
                {
                  text: "False",
                  is_correct: newFormdata.falseIsCorrect,
                },
              ],
      };

      await put(
        body,
        `subjects/${subject}/quizzes/${quizId}/questions/${question.id}`
      );

      if (errorPut !== null) {
        alert(errorPut.detail[0].msg);
        return;
      }
      updateQuizzes(subject);
      // setQuizzes({ ...quizzes, [subject]: newQuizzes });
      updateSubjects();
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

  const trueFalseLabels = ["True", "False"];

  const [editTrueFalseInputs, setEditTrueFalseInputs] = useState([
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

  const checkedInput = editInputs.filter((input) => input.checked)[0].value;

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

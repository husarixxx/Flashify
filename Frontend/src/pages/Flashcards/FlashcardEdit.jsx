import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useDelete from "../../hooks/useDelete";
import { useState } from "react";
import Modal from "../../components/Modal";
import { useParams } from "react-router-dom";
import { useFlashcards } from "../../context/FlashcardsContext";
import { useSubjects } from "../../context/SubjectsContext";
import usePut from "../../hooks/usePut";
import Form from "../../components/Form";

function FlashcardEdit({ id, question, answer }) {
  const { flashcards, setFlashcards } = useFlashcards();
  const { updateSubjects } = useSubjects();

  let params = useParams();

  const subject = params.subject;

  const { deleteEntity: deleteEntity, error: errorDelete } = useDelete();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }
  function openDeleteModal() {
    setIsDeleteOpen(true);
  }
  async function handleDelete(e) {
    e.preventDefault();
    const newFlashcard = await deleteEntity(
      `subjects/${subject}/flashcards/${id}`
    );
    const newFlashcards = flashcards[subject].filter(
      (flashcard) => flashcard.id != id
    );
    setFlashcards({ ...flashcards, [subject]: newFlashcards });
    updateSubjects();

    if (errorDelete !== null) {
      alert(errorDelete.detail[0].msg);
      return;
    }

    closeDeleteModal();
  }

  const [isEditOpen, setIsEditOpen] = useState(false);
  const { put, error: errorPut } = usePut();

  const [editInputs, setEditInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: question,
      label: "Question",
      onChange: handleEditOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: answer,
      label: "Answer",
      onChange: handleEditOnChange,
    },
  ]);

  function handleEditOnChange(e, id) {
    setEditInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }

  async function handleEdit(e) {
    e.preventDefault();
    const formData = editInputs.reduce((acc, input) => {
      const key = input.label.toLowerCase();
      acc[key] = input.error ? "" : input.value;
      return acc;
    }, {});

    let isRdyToSend = true;

    const definitionInput = editInputs.find(
      (input) => input.label === "Question"
    );
    const explanationInput = editInputs.find(
      (input) => input.label === "Answer"
    );

    if (definitionInput.value === "") {
      setEditInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Question"
            ? { ...input, error: "Question cannot be empty" }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setEditInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Question" ? { ...input, error: "" } : input;
        })
      );
    }
    if (explanationInput.value === "") {
      setEditInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Answer"
            ? { ...input, error: "Answer cannot be empty" }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setEditInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Answer" ? { ...input, error: "" } : input;
        })
      );
    }

    if (isRdyToSend) {
      const newFlashcard = await put(
        formData,
        `subjects/${subject}/flashcards/${id}`
      );
      if (errorPut !== null) {
        alert(errorPut.detail[0].msg);
        return;
      }
      const newFlashcards = flashcards[subject].map((flashcard) =>
        flashcard.id == id ? newFlashcard : flashcard
      );

      setFlashcards({
        ...flashcards,
        [subject]: newFlashcards,
      });
      updateSubjects();
      closeEditModal();
    } else {
      return;
    }
  }
  function closeEditModal() {
    setIsEditOpen(false);
  }
  function openEditModal() {
    setIsEditOpen(true);
  }
  return (
    <div className="relative flex justify-center items-center bg-gradient-to-r from-purple-600  to-purple-500 rounded-2xl shadow-xl text-white h-[150px] xs:h-[180px] sm:h-[200px] ">
      <h2 className="mx-8 mr-16">{question}</h2>
      <div className="absolute right-[-2px]  flex flex-col  justify-center items-center gap-8 h-full bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl px-3">
        <button
          className="cursor-pointer hover:translate-y-[2px] transition-transform will-change-transform"
          onClick={openDeleteModal}
        >
          <MdDelete size={36} color="#ff1a1a" />
        </button>{" "}
        <button
          className="cursor-pointer hover:translate-y-[2px] transition-transform will-change-transform"
          onClick={openEditModal}
        >
          <FaEdit size={28} color="white" />
        </button>{" "}
      </div>
      {isDeleteOpen && (
        <Modal heading={"Delete Flashcard"} modalClose={closeDeleteModal}>
          <p>Are you sure you want to delete this flashcard</p>
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
      {isEditOpen && (
        <Modal
          heading={
            <>
              Edit
              <span className="text-purple-500"> Flashcard</span>
            </>
          }
          modalClose={closeEditModal}
        >
          <Form inputs={editInputs} submitText={"Edit"} onSubmit={handleEdit} />
        </Modal>
      )}
    </div>
  );
}

export default FlashcardEdit;

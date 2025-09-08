import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useDelete from "../../hooks/useDelete";
import { useState } from "react";
import Modal from "../../components/Modal";
import { useParams } from "react-router-dom";
import { useFlashcards } from "../../context/FlashcardsContext";
import { useSubjects } from "../../context/SubjectsContext";

function FlashcardEdit({ id, definition, openEditModal }) {
  const { flashcards, setFlashcards } = useFlashcards();
  const { updateSubjects } = useSubjects();

  let params = useParams();

  const subject = params.subject;

  const {
    deleteEntity: deleteEntity,
    loading: loadingDelete,
    error: errorDelete,
  } = useDelete();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }
  function openDeleteModal() {
    setIsDeleteOpen(true);
  }
  async function handleDelete(e) {
    e.preventDefault();
    const newFlashcards = await deleteEntity(
      `subjects/${subject}/flashcards/${id}`
    );
    setFlashcards({ ...flashcards, [subject]: newFlashcards });
    updateSubjects();

    console.log("dataDelete");
    console.log(newFlashcards);
    console.log("loadingDelete");
    console.log(loadingDelete);
    console.log("errorDelete");
    console.log(errorDelete);
    closeDeleteModal();
  }
  return (
    <div className="relative flex justify-center items-center bg-gradient-to-r from-purple-600  to-purple-500 rounded-2xl shadow-xl text-white h-[150px] xs:h-[180px] sm:h-[200px] ">
      <h2 className="mx-8">{definition}</h2>
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
    </div>
  );
}

export default FlashcardEdit;

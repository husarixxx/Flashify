import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SecondButton from "../../components/SecondButton";
import MainButton from "../../components/MainButton";
import { useState } from "react";
import Modal from "../../components/Modal";

function QuestionEdit({ question, questionNumber, openEditModal }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function openDeleteModal() {
    setIsDeleteOpen(true);
  }
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }
  function handleDelete() {}

  return (
    <div className="rounded-xl shadow-lg px-5 md:px-8 py-5 md:py-6 flex justify-between gap-3 md:gap-8">
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-purple-600">{question.type} question</p>
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
    </div>
  );
}

export default QuestionEdit;

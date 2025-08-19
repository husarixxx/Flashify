import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import mySubjects from "../../exampleData";
import MainButton from "../../components/MainButton";
import NoteSet from "./NoteSet";
import { useState } from "react";
import Modal from "../../components/Modal";
import Form from "../../components/Form";

function NotesSet() {
  let params = useParams();

  const subject = params.subject;
  const subjectFiltered = Object.entries(mySubjects).filter(
    ([subject, data]) => {
      return subject === params.subject;
    }
  );
  const notes = subjectFiltered.map(([subject, data]) => data.notes)[0];
  console.log(notes);
  console.log(notes[0].title);
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
      label: "Name",
      onChange: handleOnChange,
    },
  ]);

  function handleOnChange(e, id) {
    setCreateInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }

  function modalOnSubmit(e) {
    e.preventDefault();
    closeCreateModal();
  }

  return (
    <div className="min-h-[100vh] flex flex-col justify-between ">
      <Header></Header>
      <div className="mx-4 md:mx-16 lg:mx-24 xl:mx-30 mt-12">
        <h1 className="my-4 ">{subject}</h1>
        <div className="md:grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-4">
          {notes.map((note) => (
            <NoteSet key={crypto.randomUUID()} title={note.title} />
          ))}
        </div>

        <div className="flex justify-center my-12">
          <MainButton
            text={"Create Note"}
            styles={"px-12 md:px-14"}
            onClick={openCreateModal}
          ></MainButton>
        </div>
      </div>
      {isCreateModalOpen && (
        <Modal
          heading={
            <>
              Create <span className="text-purple-600">Note</span>
            </>
          }
          modalClose={closeCreateModal}
        >
          <Form
            inputs={createInputs}
            onSubmit={modalOnSubmit}
            submitText={"Create"}
          ></Form>
        </Modal>
      )}

      <Footer></Footer>
    </div>
  );
}

export default NotesSet;

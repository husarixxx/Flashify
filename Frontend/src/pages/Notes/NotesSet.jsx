import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import MainButton from "../../components/MainButton";
import NoteSet from "./NoteSet";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Form from "../../components/Form";
import { useNotes } from "../../context/NotesContext";
import useGet from "../../hooks/useGet";
import { usePost } from "../../hooks/usePost";
import { useSubjects } from "../../context/SubjectsContext";

function NotesSet() {
  let params = useParams();
  const subject = params.subject;

  const { notes, setNotes } = useNotes();
  const { get, error: errorGet } = useGet();

  useEffect(() => {
    if (!(subject in notes)) {
      const fetchData = async () => {
        const fetchedData = await get(`subjects/${subject}/notes`);

        if (errorGet !== null) {
          alert(errorGet.detail[0].msg);
          return;
        }

        setNotes({ ...notes, [subject]: fetchedData });
      };

      fetchData();
    }
  }, [errorGet, get, notes, setNotes, subject]);

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
      label: "Title",
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

  const { post, error: errorPost } = usePost();
  const { updateSubjects } = useSubjects();

  async function modalOnSubmit(e) {
    e.preventDefault();
    let isRdyToSend = true;

    const titleInput = createInputs.find((input) => input.label === "Title");

    if (titleInput.value === "") {
      setCreateInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Title"
            ? { ...input, error: "Title cannot be empty" }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setCreateInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Title" ? { ...input, error: "" } : input;
        })
      );
    }

    if (isRdyToSend) {
      const formData = { title: titleInput.value, note: "" };

      const newNotes = await post(formData, `subjects/${subject}/notes`);

      if (errorPost !== null) {
        alert(errorPost.detail[0].msg);
        return;
      }

      setNotes({ ...notes, [subject]: newNotes });
      updateSubjects();
    } else return;

    closeCreateModal();
  }

  return (
    <div className="min-h-[100vh] flex flex-col justify-between ">
      <Header></Header>
      <div className="mx-4 md:mx-16 lg:mx-24 xl:mx-30 mt-12 2xl:mx-auto ">
        <h1 className="my-4 mx-2 ">{subject}</h1>
        {!(subject in notes) ? (
          "loading"
        ) : (
          <div className="md:grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-4">
            {notes[subject].map((note) => (
              <NoteSet id={note.id} key={note.id} title={note.title} />
            ))}
          </div>
        )}

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

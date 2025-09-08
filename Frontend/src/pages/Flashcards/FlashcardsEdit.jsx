import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MainButton from "../../components/MainButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useParams, useLocation } from "react-router-dom";
import FlashcardEdit from "./FlashcardEdit";
import Modal from "../../components/Modal";

import mySubjects from "../../exampleData";
import SecondButton from "../../components/SecondButton";
import Form from "../../components/Form";

import useDelete from "../../hooks/useDelete";
import usePut from "../../hooks/usePut";
import { useFlashcards } from "../../context/FlashcardsContext";
import useGet from "../../hooks/useGet";

function FlashcardsEdit() {
  const { put, data, loading, error } = usePut();

  const [editInputs, setEditInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "Definition",
      onChange: handleEditOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "Explanation",
      onChange: handleEditOnChange,
    },
  ]);
  const [createInputs, setCreateInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "Definition",
      onChange: handleCreateOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "Explanation",
      onChange: handleCreateOnChange,
    },
  ]);

  let params = useParams();
  const path = useLocation();

  // const [flashcards, setFlashcards] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const subject = params.subject;
  // const subjectFiltered = Object.entries(mySubjects).filter(
  //   ([subject, data]) => {
  //     return subject === params.subject;
  //   }
  // );
  // const dataFlashcards = subjectFiltered.map(
  //   ([subject, data]) => data.flashcards
  // )[0];

  const { flashcards, setFlashcards } = useFlashcards();
  console.log(flashcards);

  // const [flashcards, setFlashcards] = useState(null);
  const { get, loading: loadingGet, error: errorGet } = useGet();

  useEffect(() => {
    if (!(params.subject in flashcards)) {
      const fetchData = async () => {
        const fetchedData = await get(`subjects/${subject}/flashcards`);
        console.log("fetchedData: ", fetchedData);
        setFlashcards({ ...flashcards, [subject]: fetchedData });
      };

      fetchData();
    }
  }, [subject]);

  function handleEditOnChange(e, id) {
    setEditInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleCreateOnChange(e, id) {
    setCreateInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  // useEffect(() => {
  //   setFlashcards(dataFlashcards);
  // }, [flashcards, dataFlashcards]);

  function openEditModal() {
    setIsEditOpen(true);
  }
  function openCreateModal() {
    setIsCreateOpen(true);
  }
  function closeEditModal() {
    setIsEditOpen(false);
  }
  function closeCreateModal() {
    setIsCreateOpen(false);
  }

  function handleEdit(e) {
    e.preventDefault();
    put(
      { question: "zmienione pytanie", answer: "zmieniona definicja" },
      "flashcards/5"
    );
    console.log("data");
    console.log(data);
    console.log("loading");
    console.log(loading);
    console.log("error");
    console.log(error);
  }

  function handleCreate() {}

  return (
    <div
      className={`min-h-[100vh] flex flex-col justify-between overflow-hidden `}
    >
      <Header></Header>
      <div className="p-4 mx-auto mt-10">
        <h1 className="my-4">{subject}</h1>

        <div className="flex flex-col justify-center md:grid grid-cols-2 xl:grid-cols-3  gap-5 w-[80vw]">
          {flashcards[subject].length > 0 &&
            flashcards[subject].map((flashcard) => (
              <FlashcardEdit
                key={flashcard.id}
                id={flashcard.id}
                definition={flashcard.definition}
                openEditModal={openEditModal}
              />
            ))}
        </div>
        <div className="mt-20 flex justify-center gap-3 flex-col sm:flex-row">
          <SecondButton
            text={"Create Flashcard"}
            styles={"w-full sm:w-[250px] h-[50px]"}
            onClick={openCreateModal}
          />

          <Link to={`${path.pathname}/../learn`}>
            <MainButton
              text={"Learn"}
              styles={"w-full sm:w-[250px] h-[50px]"}
            />
          </Link>
        </div>
      </div>

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

      {isCreateOpen && (
        <Modal
          heading={
            <>
              Create
              <span className="text-purple-500"> Flashcard</span>
            </>
          }
          modalClose={closeCreateModal}
        >
          <Form
            inputs={createInputs}
            submitText={"Create"}
            onSubmit={handleCreate}
          />
        </Modal>
      )}
      <Footer></Footer>
    </div>
  );
}

export default FlashcardsEdit;

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
import { useSubjects } from "../../context/SubjectsContext";
import { usePost } from "../../hooks/usePost";

function FlashcardsEdit() {
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
  const { updateSubjects } = useSubjects();

  console.log(flashcards);

  // const [flashcards, setFlashcards] = useState(null);
  const { get, loading: loadingGet, error: errorGet } = useGet();
  const { post, loading: loadingPost, error: errorPost } = usePost();

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

  function openCreateModal() {
    setIsCreateOpen(true);
  }

  function closeCreateModal() {
    setIsCreateOpen(false);
  }

  async function handleCreate(e) {
    e.preventDefault();
    const formData = createInputs.reduce((acc, input) => {
      const key = input.label.toLowerCase();
      acc[key] = input.error ? "" : input.value;
      return acc;
    }, {});

    let isRdyToSend = true;

    const definitionInput = createInputs.find(
      (input) => input.label === "Definition"
    );
    const explanationInput = createInputs.find(
      (input) => input.label === "Explanation"
    );

    if (definitionInput.value === "") {
      setCreateInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Definition"
            ? { ...input, error: "Definition cannot be empty" }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setCreateInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Definition" ? { ...input, error: "" } : input;
        })
      );
    }
    if (explanationInput.value === "") {
      setCreateInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Explanation"
            ? { ...input, error: "Explanation cannot be empty" }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setCreateInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Explanation"
            ? { ...input, error: "" }
            : input;
        })
      );
    }

    if (isRdyToSend) {
      const newFlashcards = await post(
        formData,
        `subjects/${subject}/flashcards`
      );

      setFlashcards({ ...flashcards, [subject]: newFlashcards });
      updateSubjects();

      console.log("loading");
      console.log(loadingPost);
      console.log("error");
      console.log(errorPost);
    } else {
      return;
    }
    closeCreateModal();
  }

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

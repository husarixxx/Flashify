import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Subject from "../../components/Subject";

import MainButton from "../../components/MainButton";
import Modal from "../../components/Modal";
import Form from "../../components/Form";

// delete after creating backend
import mySubjects from "../../exampleData";
import { useState } from "react";

function Flashcards() {
  const flashcardsSubjects = Object.entries(mySubjects).map(
    ([subject, data]) => {
      return { subject: subject, flashcards: data.flashcards };
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createInputs, setCreateInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "Name",
      onChange: handleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      value: "Empty",
      label: "Empty",
      checked: true,
      onChange: handleRadioOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "radio",
      value: "With AI",
      label: "With AI",
      checked: false,
      onChange: handleRadioOnChange,
    },
  ]);

  const [aiInputs, setAiInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "Topic",
      onChange: handleOnChangeAI,
    },
    {
      id: crypto.randomUUID(),
      type: "number",
      value: "",
      label: "Number of Flashcards",
      onChange: handleOnChangeAI,
    },
  ]);
  function handleOnChange(e, id) {
    setCreateInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleOnChangeAI(e, id) {
    setAiInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }

  function handleRadioOnChange(e) {
    setCreateInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "radio" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input, checked: false };
      })
    );
  }

  function isWithAiChosen() {
    return createInputs.filter((input) => input.label === "With AI")[0].checked;
  }

  function modalOnSubmit(e) {
    e.preventDefault();
    modalClose();
  }
  function modalOpen() {
    setIsModalOpen(true);
  }
  function modalClose() {
    setIsModalOpen(false);
  }

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header loggedIn={true} logo="../src/assets/flashify.png"></Header>
      <div className="mx-4 p-4 md:mx-auto max-w-[1200px] md:translate-y-[-80px]">
        <h2>My Subjects</h2>
        <div className="md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {flashcardsSubjects.map((subject) => (
            <Subject
              key={crypto.randomUUID()}
              subject={subject.subject}
              types={[subject.flashcards]}
            />
          ))}
        </div>
        <div className="flex justify-center mt-20 lg:mt-32">
          <MainButton
            text={"Create Flashcards"}
            styles={"py-2 px-6 lg:py-3 px-12"}
            onClick={modalOpen}
          ></MainButton>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          heading={
            <>
              Create <span className="text-purple-500">Flashcards</span>{" "}
              subjects
            </>
          }
          modalClose={modalClose}
        >
          <Form
            inputs={createInputs}
            onSubmit={modalOnSubmit}
            submitText={"Create"}
            radioLegend={"Creation Type"}
            additionalInputs={isWithAiChosen() ? aiInputs : null}
          ></Form>
        </Modal>
      )}
      <Footer></Footer>
    </div>
  );
}

export default Flashcards;

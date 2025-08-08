import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SubjectList from "../../components/SubjectList";
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
      return { subject: subject, types: data.flashcards };
    }
  );

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
  }

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header></Header>
      <SubjectList
        subjects={flashcardsSubjects}
        type={"Flashcards"}
        createBtnText={"Create Flashcards"}
        modalForm={
          <Form
            inputs={createInputs}
            onSubmit={modalOnSubmit}
            submitText={"Create"}
            radioLegend={"Creation Type"}
            additionalInputs={isWithAiChosen() ? aiInputs : null}
          ></Form>
        }
      />

      <Footer></Footer>
    </div>
  );
}

export default Flashcards;

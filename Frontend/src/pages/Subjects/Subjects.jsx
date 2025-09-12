import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SubjectList from "../../components/SubjectList";
import Form from "../../components/Form";
import { useState } from "react";
import { useSubjects } from "../../context/SubjectsContext";

function Subjects() {
  const { subjects, createSubject } = useSubjects();

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
    const nameInput = createInputs.find((input) => input.label === "Name");

    if (nameInput.value === "") {
      setCreateInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Name"
            ? { ...input, error: "Name cannot be empty" }
            : input;
        })
      );
      return;
    } else if (subjects.find((subject) => subject.name == nameInput.value)) {
      setCreateInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Name"
            ? { ...input, error: "Subject with this name already exist" }
            : input;
        })
      );
      return;
    } else {
      setCreateInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Name" ? { ...input, error: "" } : input;
        })
      );
      createSubject(nameInput.value);
    }
    setCreateInputs([
      {
        id: crypto.randomUUID(),
        type: "text",
        value: "",
        label: "Name",
        onChange: handleOnChange,
      },
    ]);
    modalClose();
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  function modalOpen() {
    setIsModalOpen(true);
  }
  function modalClose() {
    setIsModalOpen(false);
  }
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header></Header>
      <SubjectList
        subjects={subjects}
        type={"global"}
        createBtnText={"Create subject"}
        isModalOpen={isModalOpen}
        modalOpen={modalOpen}
        modalClose={modalClose}
        modalForm={
          <Form
            inputs={createInputs}
            onSubmit={modalOnSubmit}
            submitText={"Create"}
          ></Form>
        }
      />
      <Footer></Footer>
    </div>
  );
}

export default Subjects;

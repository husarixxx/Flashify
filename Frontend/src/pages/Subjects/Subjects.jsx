import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SubjectList from "../../components/SubjectList";
import mySubjects from "../../exampleData";
import Form from "../../components/Form";
import { useState } from "react";

function Subjects() {
  const subjects = Object.entries(mySubjects).map(([subject, data]) => {
    return {
      subject: subject,
      types: {
        flashcards: data.flashcards.length,
        quizzes: data.quizzes.length,
        notes: data.notes.length,
      },
    };
  });

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
  }

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header></Header>
      <SubjectList
        subjects={subjects}
        type={"global"}
        createBtnText={"Create Quizzes subject"}
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

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SubjectList from "../../components/SubjectList";
import Form from "../../components/Form";
import { useState } from "react";
import mySubjects from "../../exampleData";
import { useSubjects } from "../../context/SubjectsContext";

function Notes() {
  // const notesSubjects = Object.entries(mySubjects).map(([subject, data]) => {
  //   return { subject: subject, types: data.notes };
  // });

  const { subjects } = useSubjects();

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
        type={"Notes"}
        createBtnText={"Create Notes subject"}
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

export default Notes;

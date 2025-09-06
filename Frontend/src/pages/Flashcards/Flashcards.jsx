import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SubjectList from "../../components/SubjectList";
import Form from "../../components/Form";
import useGet from "../../hooks/useGet";
import { usePost } from "../../hooks/usePost";
import { useSubjects } from "../../context/SubjectsContext";

// delete after creating backend
import mySubjects from "../../exampleData";
import { useEffect, useState } from "react";

function Flashcards() {
  const { get, data, loading, error } = useGet();

  const {
    post: post,
    data: postData,
    loading: postLoading,
    error: postError,
  } = usePost();

  const { subjects } = useSubjects();
  console.log("subjects: ");
  console.log(subjects);

  // const flashcardsSubjects = Object.entries(mySubjects).map(
  //   ([subject, data]) => {
  //     return { subject: subject, types: data.flashcards };
  //   }
  // );

  // // console.log(flashcardsSubjects);

  // useEffect(() => {
  //   get("subjects");
  // }, []);

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
      error: "",
      onChange: handleOnChangeAI,
    },
    {
      id: crypto.randomUUID(),
      type: "number",
      value: "1",
      label: "Number of Flashcards",
      min: 1,
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

    let isRdyToSend = true;

    const nameInput = createInputs.find((input) => input.label === "Name");

    if (nameInput.value === "") {
      setCreateInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Name"
            ? { ...input, error: "Name cannot be empty" }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setCreateInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Name" ? { ...input, error: "" } : input;
        })
      );
    }

    const emptyInput = createInputs.find((input) => input.label === "Empty");
    if (emptyInput.checked) {
      if (isRdyToSend) {
      } else return;
    } else {
      const topicInput = aiInputs.find((input) => input.label === "Topic");

      if (topicInput.value === "") {
        setAiInputs((prevInputs) =>
          prevInputs.map((input) => {
            return input.label === "Topic"
              ? { ...input, error: "Topic cannot be empty" }
              : input;
          })
        );
        isRdyToSend = false;
      } else {
        setAiInputs((prevInputs) =>
          prevInputs.map((input) => {
            return input.label === "Topic" ? { ...input, error: "" } : input;
          })
        );
      }
      if (isRdyToSend) {
        const formData = aiInputs.reduce((acc, input) => {
          const key = input.label.toLowerCase().replaceAll(" ", "_");
          acc[key] = input.error ? "" : input.value;
          return acc;
        }, {});
        formData.number_of_flashcards = Number.parseInt(
          formData.number_of_flashcards
        );
        console.log("formData: ");

        console.log(formData);
        console.log(aiInputs);

        setAiInputs((prevInputs) =>
          prevInputs.map((input) => {
            return input.label === "Topic" ? { ...input, error: "" } : input;
          })
        );
        post(formData, "Flashcards/Generate");
        console.log(postData);
        console.log(postLoading);
        console.log(postError);
        if (postError !== null) alert(postError.detail[0].msg);
      } else return;
    }

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
        type={"Flashcards"}
        createBtnText={"Create Flashcards"}
        isModalOpen={isModalOpen}
        modalOpen={modalOpen}
        modalClose={modalClose}
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

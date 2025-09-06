import Header from "../../components/Header";
import Footer from "../../components/Footer";
import mySubjects from "../../exampleData";
import { useParams } from "react-router-dom";
import Quiz from "./Quiz";
import MainButton from "../../components/MainButton";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Form from "../../components/Form";
import { useQuizzes } from "../../context/QuizzesContext";
import useGet from "../../hooks/useGet";

function QuizzesSet() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  let params = useParams();

  const subject = params.subject;
  // const subjectFiltered = Object.entries(mySubjects).filter(
  //   ([subject, data]) => {
  //     return subject === params.subject;
  //   }
  // );
  // const quizzes = subjectFiltered.map(([subject, data]) => data.quizzes)[0];

  const { quizzes, setQuizzes } = useQuizzes();

  const { get, loading, error } = useGet();

  useEffect(() => {
    if (!(subject in quizzes)) {
      const fetchData = async () => {
        const fetchedData = await get(`subjects/${subject}/quizzes`);
        console.log("fetchedData: ", fetchedData);
        setQuizzes({ ...quizzes, [subject]: fetchedData });
      };

      fetchData();
    }
  }, [subject, quizzes, setQuizzes]);

  const [createQuizInputs, setCreateQuizInputs] = useState([
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

  const [aiCreateInputs, setAiCreateInputs] = useState([
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
      value: 1,
      min: 1,
      label: "Number of questions",

      onChange: handleOnChangeAI,
    },
    {
      id: crypto.randomUUID(),
      type: "checkbox",
      value: "Single choice",
      label: "Single choice",
      checked: true,
      name: "Types of questions",
      onChange: handleCheckboxOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "checkbox",
      value: "Multiple choice",
      label: "Multiple choice",
      checked: false,
      name: "Types of questions",
      onChange: handleCheckboxOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "checkbox",
      value: "True or False",
      label: "True or False",
      checked: false,
      name: "Types of questions",
      onChange: handleCheckboxOnChange,
    },
  ]);

  function handleOnChange(e, id) {
    setCreateQuizInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleOnChangeAI(e, id) {
    setAiCreateInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }

  function handleRadioOnChange(e) {
    setCreateQuizInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "radio" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input, checked: false };
      })
    );
  }
  function handleCheckboxOnChange(e) {
    setAiCreateInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.type === "checkbox" && input.value === e.target.value
          ? { ...input, checked: e.target.checked }
          : { ...input };
      })
    );
  }

  function isWithAiChosen() {
    return createQuizInputs.filter((input) => input.label === "With AI")[0]
      .checked;
  }

  function openCreateModal() {
    setIsCreateModalOpen(true);
  }
  function closeCreateModal() {
    setIsCreateModalOpen(false);
  }

  function modalCreateOnSubmit(e) {
    e.preventDefault();
    let isRdyToSend = true;

    const nameInput = createQuizInputs.find((input) => input.label === "Name");

    if (nameInput.value === "") {
      setCreateQuizInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Name"
            ? { ...input, error: "Name cannot be empty" }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setCreateQuizInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Name" ? { ...input, error: "" } : input;
        })
      );
    }

    const emptyInput = createQuizInputs.find(
      (input) => input.label === "Empty"
    );
    if (emptyInput.checked) {
      if (isRdyToSend) {
      } else return;
    } else {
      const topicInput = aiCreateInputs.find(
        (input) => input.label === "Topic"
      );

      if (topicInput.value === "") {
        setAiCreateInputs((prevInputs) =>
          prevInputs.map((input) => {
            return input.label === "Topic"
              ? { ...input, error: "Topic cannot be empty" }
              : input;
          })
        );
        isRdyToSend = false;
      } else {
        setAiCreateInputs((prevInputs) =>
          prevInputs.map((input) => {
            return input.label === "Topic" ? { ...input, error: "" } : input;
          })
        );
      }
      if (isRdyToSend) {
        const formData = setAiCreateInputs.reduce((acc, input) => {
          const key = input.label.toLowerCase().replaceAll(" ", "_");
          acc[key] = input.error ? "" : input.value;
          return acc;
        }, {});
        formData.number_of_flashcards = Number.parseInt(
          formData.number_of_flashcards
        );
        console.log("formData: ");

        console.log(formData);
        console.log(aiCreateInputs);

        setAiCreateInputs((prevInputs) =>
          prevInputs.map((input) => {
            return input.label === "Topic" ? { ...input, error: "" } : input;
          })
        );
        // aiPost(formData);
        // console.log(postData);
        // console.log(postLoading);
        // console.log(postError);
        // if (postError !== null) alert(postError.detail[0].msg);
      } else return;
    }

    closeCreateModal();
  }
  return (
    <div className="min-h-[100vh] flex flex-col justify-between ">
      <Header></Header>
      <div className="mx-4 md:mx-16 lg:mx-24 xl:mx-30 mt-12 2xl:mx-auto 2xl:px-10 ">
        <h1 className="my-4 ">{subject}</h1>
        {!(subject in quizzes) ? (
          "loading"
        ) : (
          <div className="md:grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4   gap-4 ">
            {quizzes[subject].map((quiz) => {
              return (
                <Quiz
                  key={crypto.randomUUID()}
                  quizData={quiz}
                  title={quiz.title}
                  numOfQuestions={quiz.questions.length}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="flex justify-center my-12">
        <MainButton
          text={"Create Quiz"}
          styles={"px-12 md:px-14"}
          onClick={openCreateModal}
        ></MainButton>
      </div>
      <Footer></Footer>
      {isCreateModalOpen && (
        <Modal
          heading={
            <>
              Create <span className="text-purple-500">Quiz</span>
            </>
          }
          modalClose={closeCreateModal}
        >
          <Form
            inputs={createQuizInputs}
            submitText={"Create"}
            onSubmit={modalCreateOnSubmit}
            radioLegend={"Creation Type"}
            additionalInputs={isWithAiChosen() ? aiCreateInputs : null}
            checkboxLegend={"Types of questions"}
          ></Form>
        </Modal>
      )}
    </div>
  );
}
export default QuizzesSet;

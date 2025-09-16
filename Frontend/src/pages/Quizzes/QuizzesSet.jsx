import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import Quiz from "./Quiz";
import MainButton from "../../components/MainButton";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Form from "../../components/Form";
import { useQuizzes } from "../../context/QuizzesContext";
import useGet from "../../hooks/useGet";
import { useSubjects } from "../../context/SubjectsContext";
import { usePost } from "../../hooks/usePost";

function QuizzesSet() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  let params = useParams();

  const subject = params.subject;

  const { quizzes, setQuizzes } = useQuizzes();

  const { get, error: errorGet } = useGet();

  const { subjects, updateSubjects } = useSubjects();
  const currentSubjectName = subjects.filter(
    (subject) => subject.id == params.subject
  )[0].name;

  useEffect(() => {
    if (!(subject in quizzes)) {
      const fetchData = async () => {
        const fetchedData = await get(`subjects/${subject}/quizzes`);
        if (errorGet !== null) {
          alert(errorGet.detail[0].msg);
          return;
        }

        fetchedData.map((quiz) => {
          quiz.questions = quiz.questions.map((question) => ({
            ...question,
            answers: question.answers.map(({ is_correct, ...rest }) => ({
              ...rest,
              isCorrect: is_correct,
            })),
          }));
          return quiz;
        });
        setQuizzes({ ...quizzes, [subject]: fetchedData });
      };

      fetchData();
    }
  }, [subject, quizzes, setQuizzes, get, errorGet]);

  const [createQuizInputs, setCreateQuizInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "Title",
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

  const { post, error: errorPost, loading: loadingPost } = usePost();
  async function modalCreateOnSubmit(e) {
    e.preventDefault();
    let isRdyToSend = true;

    const nameInput = createQuizInputs.find((input) => input.label === "Title");

    if (nameInput.value === "") {
      setCreateQuizInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Title"
            ? { ...input, error: "Title cannot be empty" }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setCreateQuizInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Title" ? { ...input, error: "" } : input;
        })
      );
    }

    const emptyInput = createQuizInputs.find(
      (input) => input.label === "Empty"
    );
    if (emptyInput.checked) {
      if (isRdyToSend) {
        const formData = { title: nameInput.value };

        const newQuiz = await post(formData, `subjects/${subject}/quizzes`);
        setQuizzes({ ...quizzes, [subject]: [...quizzes[subject], newQuiz] });
        updateSubjects();
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
        const requestData = aiCreateInputs.reduce((acc, input) => {
          const key = input.label.toLowerCase().replaceAll(" ", "_");

          if (input.error) return acc;

          if (input.type === "checkbox") {
            if (!acc.question_types) acc.question_types = [];
            if (input.checked)
              acc.question_types.push(
                input.value
                  .toLocaleLowerCase()
                  .replaceAll(" ", "-")
                  .replaceAll("-or", "")
              );
          } else {
            acc[key] = input.value;
          }

          return acc;
        }, {});
        requestData.number_of_questions = Number.parseInt(
          requestData.number_of_questions
        );

        setAiCreateInputs((prevInputs) =>
          prevInputs.map((input) => {
            return input.label === "Topic" ? { ...input, error: "" } : input;
          })
        );
        const formData = {
          quiz_data: { title: nameInput.value },
          request_data: requestData,
        };

        const newQuiz = await post(
          formData,
          `subjects/${subject}/quizzes/generate`
        );

        newQuiz.questions = newQuiz.questions.map((question) => ({
          ...question,
          answers: question.answers.map(({ is_correct, ...rest }) => ({
            ...rest,
            isCorrect: is_correct,
          })),
        }));
        if (errorPost !== null) {
          alert(errorPost);

          return;
        }
        setQuizzes({
          ...quizzes,
          [subject]: [...quizzes[subject], newQuiz],
        });

        updateSubjects();
      } else return;
    }

    closeCreateModal();
  }
  return (
    <div className="min-h-[100vh] flex flex-col justify-between ">
      <Header></Header>
      <div className="mx-4 md:mx-16 lg:mx-24 xl:mx-30 mt-12 2xl:mx-auto 2xl:px-10 ">
        <h1 className="my-4 ">{currentSubjectName}</h1>
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
          modalLoading={loadingPost}
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

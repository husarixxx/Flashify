import { createContext, useContext, useState } from "react";
import useGet from "../hooks/useGet";

const QuizzesContext = createContext();
export const QuizzesProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState({});
  const { get } = useGet();
  const updateQuizzes = async (subject) => {
    const fetchedQuizzes = await get(`subjects/${subject}/quizzes`);
    fetchedQuizzes.map((quiz) => {
      quiz.questions = quiz.questions.map((question) => ({
        ...question,
        answers: question.answers.map(({ is_correct, ...rest }) => ({
          ...rest,
          isCorrect: is_correct,
        })),
      }));
      return quiz;
    });
    setQuizzes({ ...quizzes, [subject]: fetchedQuizzes });
  };

  return (
    <QuizzesContext.Provider value={{ quizzes, setQuizzes, updateQuizzes }}>
      {children}
    </QuizzesContext.Provider>
  );
};

export const useQuizzes = () => useContext(QuizzesContext);

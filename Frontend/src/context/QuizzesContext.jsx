import { createContext, useContext, useState } from "react";

const QuizzesContext = createContext();
export const QuizzesProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState({});
  return (
    <QuizzesContext.Provider value={{ quizzes, setQuizzes }}>
      {children}
    </QuizzesContext.Provider>
  );
};

export const useQuizzes = () => useContext(QuizzesContext);

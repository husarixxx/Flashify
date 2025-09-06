import { createContext, useContext, useState } from "react";

const FlashcardsContext = createContext();
export const FlashcardsProvider = ({ children }) => {
  const [flashcards, setFlashcards] = useState({});
  return (
    <FlashcardsContext.Provider value={{ flashcards, setFlashcards }}>
      {children}
    </FlashcardsContext.Provider>
  );
};

export const useFlashcards = () => useContext(FlashcardsContext);

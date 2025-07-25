import { createContext, useContext, useState } from "react";

const FlashcardContext = createContext();

export const FlashcardProvider = ({ children }) => {
  const [swipe, setSwipe] = useState({ left: false, right: false });
  return (
    <FlashcardContext.Provider value={{ swipe, setSwipe }}>
      {children}
    </FlashcardContext.Provider>
  );
};

export const useFlashcard = () => useContext(FlashcardContext);

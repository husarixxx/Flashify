import { createContext, useContext, useState } from "react";

const FlashcardSwipeContext = createContext();

export const FlashcardSwipeProvider = ({ children }) => {
  const [swipe, setSwipe] = useState({ left: false, right: false });
  return (
    <FlashcardSwipeContext.Provider value={{ swipe, setSwipe }}>
      {children}
    </FlashcardSwipeContext.Provider>
  );
};

export const useSwipe = () => useContext(FlashcardSwipeContext);

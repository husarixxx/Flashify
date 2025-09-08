import { createContext, useContext, useState } from "react";

const NotesContext = createContext();
export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState({});
  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);

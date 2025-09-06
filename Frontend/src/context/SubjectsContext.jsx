import { createContext, useContext, useState, useEffect } from "react";

const SubjectsContext = createContext();
export const SubjectsProvider = ({ children }) => {
  const [subjects, setSubjects] = useState(null);
  return (
    <SubjectsContext.Provider value={{ subjects, setSubjects }}>
      {children}
    </SubjectsContext.Provider>
  );
};

export const useSubjects = () => useContext(SubjectsContext);

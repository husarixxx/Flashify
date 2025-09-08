import { createContext, useContext, useState, useEffect } from "react";
import useGet from "../hooks/useGet";

const SubjectsContext = createContext();
export const SubjectsProvider = ({ children }) => {
  const [subjects, setSubjects] = useState(null);

  const { get } = useGet();
  const updateSubjects = async () => {
    const fetchedSubjects = await get("subjects");
    setSubjects(fetchedSubjects);
  };
  return (
    <SubjectsContext.Provider value={{ subjects, setSubjects, updateSubjects }}>
      {children}
    </SubjectsContext.Provider>
  );
};

export const useSubjects = () => useContext(SubjectsContext);

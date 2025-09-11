import { createContext, useContext, useState, useEffect } from "react";
import useGet from "../hooks/useGet";
import usePut from "../hooks/usePut";

const SubjectsContext = createContext();
export const SubjectsProvider = ({ children }) => {
  const [subjects, setSubjects] = useState(null);

  const { get } = useGet();
  const { put } = usePut();
  const updateSubjects = async () => {
    const fetchedSubjects = await get("subjects");
    setSubjects(fetchedSubjects);
  };
  const createSubject = async (name) => {
    const formData = { name: name };
    const newSubjects = await put(formData, `subjects`);
    setSubjects(newSubjects);
  };
  return (
    <SubjectsContext.Provider
      value={{ subjects, setSubjects, updateSubjects, createSubject }}
    >
      {children}
    </SubjectsContext.Provider>
  );
};

export const useSubjects = () => useContext(SubjectsContext);

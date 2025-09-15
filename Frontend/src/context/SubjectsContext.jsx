import { createContext, useContext, useState } from "react";
import useGet from "../hooks/useGet";
import { usePost } from "../hooks/usePost";
const SubjectsContext = createContext();
export const SubjectsProvider = ({ children }) => {
  const [subjects, setSubjects] = useState(null);

  const { get } = useGet();
  const { post } = usePost();
  const updateSubjects = async () => {
    const fetchedSubjects = await get("subjects/count");
    setSubjects(fetchedSubjects);
  };
  const createSubject = async (name) => {
    const formData = { name: name };
    const newSubject = await post(formData, `subjects`);
    setSubjects([...subjects, newSubject]);
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

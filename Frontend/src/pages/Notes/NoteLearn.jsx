import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams, useLocation } from "react-router-dom";
import mySubjects from "../../exampleData";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.bubble.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useNotes } from "../../context/NotesContext";
import useGet from "../../hooks/useGet";

function NoteLearn() {
  let params = useParams();
  let path = useLocation();
  let navigate = useNavigate();

  const subject = params.subject;
  const noteTitle = params.noteTitle;

  // const subjectFiltered = Object.entries(mySubjects).filter(
  //   ([subject, data]) => {
  //     return subject === params.subject;
  //   }
  // );
  // const notesData = subjectFiltered.map(([subject, data]) => data.notes)[0];
  // const noteData = notesData.filter(
  //   (note) => note.title === params.noteTitle
  // )[0];
  // const { note } = noteData;

  const { notes, setNotes } = useNotes();

  const { get, loading, error } = useGet();

  useEffect(() => {
    if (!(subject in notes)) {
      const fetchData = async () => {
        const fetchedData = await get(`subjects/${subject}/notes`);
        console.log("fetchedData: ", fetchedData);
        setNotes({ ...notes, [subject]: fetchedData });
      };

      fetchData();
    }
  }, [subject]);

  console.log(notes);

  const { quill, quillRef } = useQuill({ readOnly: true, theme: "bubble" });
  useEffect(() => {
    let noteData;
    if (subject in notes) {
      noteData = notes[subject].find((note) => note.title == noteTitle);
      console.log("Note Data halooo:");
      console.log(noteData.note);

      if (quill) {
        quill.clipboard.dangerouslyPasteHTML(noteData.note);
      }
    }
  }, [quill, notes, noteTitle, subject]);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between ">
      <Header />

      <div className="grow flex flex-col">
        <div
          className="   p-8 grow flex flex-col"
          onDoubleClick={() => {
            navigate("../edit", { relative: "path", preventScrollReset: true });
          }}
        >
          <div ref={quillRef} className="grow h-full" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default NoteLearn;

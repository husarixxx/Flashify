import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import mySubjects from "../../exampleData";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import "../../assets/quillStyles.css";

function NoteEdit() {
  let params = useParams();

  const subjectFiltered = Object.entries(mySubjects).filter(
    ([subject, data]) => {
      return subject === params.subject;
    }
  );
  const notesData = subjectFiltered.map(([subject, data]) => data.notes)[0];
  const noteData = notesData.filter(
    (note) => note.title === params.noteTitle
  )[0];
  const { note } = noteData;

  const { quill, quillRef } = useQuill({ readOnly: false, theme: "snow" });
  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(note);
    }
  }, [quill, note]);
  return (
    <div className="min-h-[100vh] flex flex-col justify-between ">
      <Header />

      <div className="grow flex flex-col">
        <div className=" p-4 grow flex flex-col">
          <div ref={quillRef} className="grow h-full" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default NoteEdit;

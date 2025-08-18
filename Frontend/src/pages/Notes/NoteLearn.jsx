import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams, useLocation } from "react-router-dom";
import mySubjects from "../../exampleData";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.bubble.css";
import { useEffect } from "react";

function NoteLearn() {
  let params = useParams();
  const path = useLocation();

  const subject = params.subject;
  const subjectFiltered = Object.entries(mySubjects).filter(
    ([subject, data]) => {
      return subject === params.subject;
    }
  );
  const notesData = subjectFiltered.map(([subject, data]) => data.notes)[0];
  const noteData = notesData.filter(
    (note) => note.title === params.noteTitle
  )[0];
  const { title, note } = noteData;

  const { quill, quillRef } = useQuill({ readOnly: true, theme: "bubble" });
  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(note);
    }
  }, [quill, note]);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between ">
      <div>
        <Header></Header>

        <div className="mx-6 my-12  shadow-lg p-4 ">
          <div ref={quillRef} />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default NoteLearn;

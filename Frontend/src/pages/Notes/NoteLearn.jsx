import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.bubble.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useNotes } from "../../context/NotesContext";
import useGet from "../../hooks/useGet";

function NoteLearn() {
  let params = useParams();
  let navigate = useNavigate();

  const subject = params.subject;
  const noteId = params.noteId;

  const { notes, setNotes } = useNotes();

  const { get, error: errorGet } = useGet();

  useEffect(() => {
    if (!(subject in notes)) {
      const fetchData = async () => {
        const fetchedData = await get(`subjects/${subject}/notes`);
        if (errorGet !== null) {
          alert(errorGet.detail[0].msg);
          return;
        }
        setNotes({ ...notes, [subject]: fetchedData });
      };

      fetchData();
    }
  }, [errorGet, get, notes, setNotes, subject]);

  const { quill, quillRef } = useQuill({ readOnly: true, theme: "bubble" });
  useEffect(() => {
    if (subject in notes) {
      const noteData = notes[subject].find((note) => note.id == noteId);

      if (quill) {
        quill.clipboard.dangerouslyPasteHTML(noteData.content);
      }
    }
  }, [quill, notes, noteId, subject]);

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

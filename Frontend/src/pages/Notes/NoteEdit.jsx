import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import "../../assets/quillStyles.css";
import { useNotes } from "../../context/NotesContext";
import useGet from "../../hooks/useGet";
import { debounce } from "lodash";
import usePut from "../../hooks/usePut";
import { useSubjects } from "../../context/SubjectsContext";

function NoteEdit() {
  let params = useParams();
  const subject = params.subject;
  const noteId = params.noteId;

  const { notes, setNotes } = useNotes();
  const { get, error: errorGet } = useGet();
  const { put, error: errorPut } = usePut();
  const { updateSubjects } = useSubjects();

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

  async function saveNote(content) {
    const currentNote = notes[subject].find((note) => note.id == noteId);
    const formData = { title: currentNote.title, content: content };
    const newNote = await put(formData, `subjects/${subject}/notes/${noteId}`);

    const newNotes = notes[subject].map((note) =>
      note.id == noteId ? newNote : note
    );

    if (errorPut !== null) {
      alert(errorPut.detail[0].msg);
      return;
    }

    setNotes({ ...notes, [subject]: newNotes });
    updateSubjects();
  }

  const debounceSave = debounce((content) => saveNote(content), 3000, {
    leading: false,
    trailing: true,
  });

  const { quill, quillRef } = useQuill({ readOnly: false, theme: "snow" });
  useEffect(() => {
    if (subject in notes) {
      const noteData = notes[subject].find((note) => note.id == noteId);

      if (quill) {
        if (quill.getLength() === 1) {
          quill.clipboard.dangerouslyPasteHTML(noteData.content);
        }
        function handleChange() {
          const content = quill.root.innerHTML;
          debounceSave(content);
        }
        quill.on("text-change", handleChange);
        return () => {
          quill.off("text-change", handleChange);
        };
      }
    }
  }, [quill, noteId, notes, subject, debounceSave]);
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

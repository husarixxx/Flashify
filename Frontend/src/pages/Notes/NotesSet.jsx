import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams, useLocation } from "react-router-dom";
import mySubjects from "../../exampleData";
import MainButton from "../../components/MainButton";
import NoteSet from "./NoteSet";

function NotesSet() {
  let params = useParams();

  const subject = params.subject;
  const subjectFiltered = Object.entries(mySubjects).filter(
    ([subject, data]) => {
      return subject === params.subject;
    }
  );
  const notes = subjectFiltered.map(([subject, data]) => data.notes)[0];
  console.log(notes);
  console.log(notes[0].title);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between ">
      <Header></Header>
      <div className="mx-4 md:mx-16 lg:mx-24 xl:mx-30 mt-12">
        <h1 className="my-4 ">{subject}</h1>
        <div className="md:grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-4">
          {notes.map((note) => (
            <NoteSet key={crypto.randomUUID()} title={note.title} />
          ))}
        </div>

        <div className="flex justify-center my-12">
          <MainButton
            text={"Create Note"}
            styles={"px-12 md:px-14"}
          ></MainButton>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default NotesSet;

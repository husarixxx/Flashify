import MainButton from "../../components/MainButton";
import SecondButton from "../../components/SecondButton";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function NoteSet({ title }) {
  console.log(title);
  const path = useLocation();
  return (
    <div className="rounded-xl shadow-lg m-4 p-4 py-8 mt-10 sm:mt-4 text-center flex flex-col justify-between gap-4">
      <h2>{title}</h2>
      <Link to={`${path.pathname}/${title}/edit`}>
        <SecondButton text={"Edit"} styles={"w-full"}></SecondButton>
      </Link>
      <Link to={`${path.pathname}/${title}/learn`}>
        <MainButton text={"Learn"} styles={"w-full"}></MainButton>
      </Link>
    </div>
  );
}
export default NoteSet;

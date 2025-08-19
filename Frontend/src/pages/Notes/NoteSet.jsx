import MainButton from "../../components/MainButton";
import SecondButton from "../../components/SecondButton";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function NoteSet({ title }) {
  console.log(title);
  const path = useLocation();
  return (
    <div className="  rounded-xl shadow-lg m-4 px-8 py-6 pb-10 text-center flex flex-col justify-between gap-5 border-1 border-gray-200">
      <h2>{title}</h2>
      <div className="flex flex-col gap-4">
        <Link to={`${path.pathname}/${title}/edit`}>
          <SecondButton
            text={"Edit"}
            styles={"w-full max-w-[260px]"}
          ></SecondButton>
        </Link>
        <Link to={`${path.pathname}/${title}/learn`}>
          <MainButton
            text={"Learn"}
            styles={"w-full max-w-[260px] "}
          ></MainButton>
        </Link>
      </div>
    </div>
  );
}
export default NoteSet;

import { Link } from "react-router-dom";
import Container from "./Container";
function Subjects({ subject, types }) {
  return (
    <Link>
      <Container styles="relative group md:w-[250px] hover:text-white ">
        <div className="relative z-10">
          <h3 className="">{subject}</h3>

          {types.map((type) => (
            <p key={crypto.randomUUID()} className="group-hover:text-white ">
              {type.length} Flashcards
            </p>
          ))}
        </div>
        <div className="absolute z-1 top-0 left-0 bg-gradient-to-r  from-purple-600 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity h-full w-full rounded-2xl"></div>
      </Container>
    </Link>
  );
}

export default Subjects;

import { Link } from "react-router-dom";
import Container from "./Container";
function Subjects({ subject, types, type }) {
  const globalType = type;
  return (
    <Link to={`/home/${type.toLowerCase()}/${subject}`}>
      <Container styles="relative group md:w-[250px] hover:text-white group overflow-hidden">
        <div className="relative z-10">
          <h3 className="group-hover:text-white">{subject}</h3>

          {types.map((type) => (
            <p key={crypto.randomUUID()} className="group-hover:text-white ">
              {type.length + " " + globalType}
            </p>
          ))}
        </div>
        <div className="absolute z-1 top-0 left-0 bg-gradient-to-r scale-x-0 origin-left  from-purple-600 to-purple-500  group-hover:scale-100 duration-200 transition-transform h-full w-full rounded-2xl"></div>
      </Container>
    </Link>
  );
}

export default Subjects;

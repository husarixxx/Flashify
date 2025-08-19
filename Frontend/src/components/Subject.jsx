import { Link } from "react-router-dom";
import Container from "./Container";
import { TbCards } from "react-icons/tb";
import { MdOutlineQuiz } from "react-icons/md";
import { TbNotes } from "react-icons/tb";

function Subjects({ subject, types, type }) {
  const globalType = type;
  console.log(types);
  console.log(` subject types: ${types}`);
  console.log(` subject single type: ${type}`);

  return (
    <Link
      to={
        type === "global"
          ? `/app/subjects/${subject}`
          : `/app/${type.toLowerCase()}/${subject}`
      }
    >
      <Container styles="relative group md:w-[250px] hover:text-white group overflow-hidden">
        <div className="relative z-10">
          <h3 className="group-hover:text-white">{subject}</h3>

          {type === "global" ? (
            <>
              <p
                key={crypto.randomUUID()}
                className="group-hover:text-white flex gap-2"
              >
                <TbCards size={21} />
                {types[0].flashcards + " Flashcards"}
              </p>
              <p
                key={crypto.randomUUID()}
                className="group-hover:text-white flex gap-2 mt-2"
              >
                <MdOutlineQuiz size={21} />
                {types[0].quizzes + " Quizzes"}
              </p>
              <p
                key={crypto.randomUUID()}
                className="group-hover:text-white flex gap-2 mt-2"
              >
                <TbNotes size={21} />
                {types[0].notes + " Notes"}
              </p>
            </>
          ) : (
            types.map((type) => (
              <p key={crypto.randomUUID()} className="group-hover:text-white ">
                {type.length + " " + globalType}
              </p>
            ))
          )}
        </div>
        <div className="absolute z-1 top-0 left-0 bg-gradient-to-r scale-x-0 origin-left  from-purple-600 to-purple-500  group-hover:scale-100 duration-200 transition-transform h-full w-full rounded-2xl"></div>
      </Container>
    </Link>
  );
}

export default Subjects;

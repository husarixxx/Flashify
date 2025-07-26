import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function FlashcardEdit({ definition }) {
  return (
    <div className="relative flex justify-center items-center bg-gradient-to-r from-purple-600  to-purple-500 rounded-2xl shadow-xl text-white h-[150px] xs:h-[180px] sm:h-[200px] ">
      {" "}
      <h2 className="mx-8">{definition}</h2>
      <div className="absolute right-2  flex flex-col  justify-center items-center gap-8">
        <MdDelete size={36} />

        <FaEdit size={28} />
      </div>
    </div>
  );
}

export default FlashcardEdit;

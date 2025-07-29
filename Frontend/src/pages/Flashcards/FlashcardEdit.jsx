import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function FlashcardEdit({ definition }) {
  return (
    <div className="relative flex justify-center items-center bg-gradient-to-r from-purple-600  to-purple-500 rounded-2xl shadow-xl text-white h-[150px] xs:h-[180px] sm:h-[200px] ">
      <h2 className="mx-8">{definition}</h2>
      <div className="absolute right-[-2px]  flex flex-col  justify-center items-center gap-8 h-full bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl px-3">
        <button className="cursor-pointer hover:translate-y-[2px] transition-transform will-change-transform">
          <MdDelete size={36} color="#ff1a1a" />
        </button>{" "}
        <button className="cursor-pointer hover:translate-y-[2px] transition-transform will-change-transform">
          <FaEdit size={28} color="white" />
        </button>{" "}
      </div>
    </div>
  );
}

export default FlashcardEdit;

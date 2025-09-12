import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import MainButton from "./MainButton";

function Modal({
  children,
  heading,
  modalClose,
  modalHandle,
  modalSubmitText,
}) {
  return createPortal(
    <div
      className={`bg-black/70 w-[100vw] h-[100vh] fixed top-0 flex justify-center items-center animate-render z-999`}
    >
      <div className="bg-white px-5 pt-1 pb-6 rounded-xl">
        <div className="flex justify-between items-center gap-5">
          <h2>{heading}</h2>
          <button
            onClick={modalClose}
            className="cursor-pointer scale-90 hover:scale-100 transition-transform will-change-transform"
          >
            <IoMdClose size={28} />
          </button>
        </div>
        {children}
        {modalSubmitText && (
          <MainButton
            text={modalSubmitText}
            onClick={modalHandle}
            styles={"w-full"}
          />
        )}
      </div>
    </div>,
    document.body
  );
}

export default Modal;

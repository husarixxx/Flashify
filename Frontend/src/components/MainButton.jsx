function MainButton({ text, styles, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-white lg:text-xl font-bold bg-purple-500 border-1 border-purple-500 py-2 px-4 rounded-3xl opacity-88 hover:cursor-pointer hover:opacity-100 transition-opacity shadow-md ${styles}`}
    >
      {text}
    </button>
  );
}

export default MainButton;

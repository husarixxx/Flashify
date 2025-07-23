function SecondButton({ text, styles }) {
  return (
    <button
      className={`text-purple-500 lg:text-xl font-bold border-1 border-purple-500 py-2 px-4 rounded-3xl opacity-88 hover:cursor-pointer hover:opacity-100 transition-opacity shadow-md ${styles}`}
    >
      {text}
    </button>
  );
}

export default SecondButton;

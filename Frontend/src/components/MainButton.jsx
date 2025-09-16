function MainButton({ text, styles, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-white lg:text-xl font-bold bg-purple-500 border-1 border-purple-500 py-2 px-4 rounded-3xl opacity-80 hover:cursor-pointer hover:opacity-100 transition-opacity shadow-md disabled:cursor-not-allowed disabled:opacity-50 ${styles} `}
    >
      {text}
    </button>
  );
}

export default MainButton;

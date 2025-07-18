function ContinueBtn({ icon, text }) {
  return (
    <button className="flex items-center gap-2 text-sm lg:text-base border-1 border-purple-500 py-2 px-4 rounded-md text-purple-600 grow w-[250px] mb-6 hover:bg-purple-700 hover:text-white hover:cursor-pointer transition-colors duration-350">
      {icon}
      {text}
    </button>
  );
}

export default ContinueBtn;

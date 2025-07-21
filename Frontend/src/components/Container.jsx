function Container({ children }) {
  return (
    <div className="shadow-lg border-1 border-gray-300 p-4 m-4 rounded-2xl">
      {children}
    </div>
  );
}

export default Container;

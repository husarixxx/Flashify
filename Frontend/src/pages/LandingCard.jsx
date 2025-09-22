function LandingCard({ img, desc }) {
  return (
    <div className="max-w-[800px] ">
      <img
        src={img}
        alt={desc}
        className="border-1 border-gray-300 rounded-md"
      />{" "}
      <p className="mt-4 text-lg font-bold">{desc}</p>
    </div>
  );
}

export default LandingCard;

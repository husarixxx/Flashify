function LandingCard({ img, desc }) {
  return (
    <div className="max-w-[300px]">
      <img src={img} alt={desc} />{" "}
      <p className="mt-4 text-lg font-bold">{desc}</p>
    </div>
  );
}

export default LandingCard;

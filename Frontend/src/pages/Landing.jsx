import Header from "../components/Header";
import Footer from "../components/Footer";
import LandingCard from "./LandingCard";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header></Header>
      <main className="text-center px-4 lg:py-6">
        <h1 className="text-xl font-bold my-8 lg:text-3xl">
          Learn Faster with <span className="text-purple-500">Flashify</span>
        </h1>
        <p className="lg:text-lg text-gray-800">
          Master new skills with flashcards and quizzes. Short sessions,
          consistent practice, real results.
        </p>

        <div className="flex flex-col gap-8 items-center my-10 md:flex-row md:justify-between max-w-[1200px] md:mx-auto">
          <LandingCard
            img="./src/assets/test.png"
            desc="Generate flashcards"
          ></LandingCard>
          <LandingCard
            img="./src/assets/test.png"
            desc="Generate quizzess"
          ></LandingCard>{" "}
          <LandingCard
            img="./src/assets/test.png"
            desc="Create notes"
          ></LandingCard>
        </div>

        <Link
          to="/sign-up"
          className=" my-8 text-white text-xl lg:text-2xl font-bold bg-purple-500 py-2.5 px-12 rounded-3xl shadow-lg opacity-88 hover:cursor-pointer hover:opacity-100 transition-opacity"
        >
          Get Started
        </Link>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Landing;

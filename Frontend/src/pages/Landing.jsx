import Header from "../components/Header";
import Footer from "../components/Footer";
import LandingCard from "./LandingCard";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header></Header>
      <main className="flex flex-col items-center text-center px-4 pb-12 lg:py-6">
        <h1>
          Learn Faster with <span className="text-purple-500">Flashify</span>
        </h1>
        <p>
          Master new skills with flashcards and quizzes. Short sessions,
          consistent practice, real results.
        </p>

        <div className="flex flex-col gap-8 items-center my-10 lg:flex-row lg:justify-between max-w-[1800px] lg:mx-auto">
          <LandingCard
            img="./src/assets/flashcards.png"
            desc="Generate flashcards"
          ></LandingCard>
          <LandingCard
            img="./src/assets/quizzes.png"
            desc="Generate quizzess"
          ></LandingCard>{" "}
          <LandingCard
            img="./src/assets/notes.png"
            desc="Create notes"
          ></LandingCard>
        </div>

        <Link
          to="/sign-up"
          className="  text-white text-lg lg:text-xl font-bold bg-purple-500 py-2.5  px-12 rounded-3xl shadow-lg opacity-88 hover:cursor-pointer hover:opacity-100 transition-opacity my-8 mt-16"
        >
          Get Started
        </Link>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Landing;

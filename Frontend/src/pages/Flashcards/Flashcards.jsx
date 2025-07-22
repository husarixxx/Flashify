import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Flashcards() {
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header loggedIn={true} logo="../src/assets/flashify.png"></Header>
      <Footer></Footer>
    </div>
  );
}

export default Flashcards;

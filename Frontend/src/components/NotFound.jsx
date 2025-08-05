import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import MainButton from "./MainButton";
import { useLoggedIn } from "../context/LoggedInContext";

function NotFound() {
  const { isLoggedIn } = useLoggedIn();
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header logo="../src/assets/flashify.png"></Header>
      <div className="flex items-center justify-center flex-col px-6 text-center">
        <h1>404 - Page not found</h1>
        <p>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link to={isLoggedIn ? "/app" : "/"}>
          <MainButton text={"Go back"} styles={"mt-8 px-10"}></MainButton>
        </Link>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default NotFound;

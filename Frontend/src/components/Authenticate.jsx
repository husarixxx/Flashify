import { useNavigate } from "react-router-dom";
import { useLoggedIn } from "../context/LoggedInContext";
import { useEffect } from "react";

function Authenticate({ children }) {
  const { isLoggedIn } = useLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) navigate("/log-in");
  });
  if (isLoggedIn) return <>{children}</>;
  else if (isLoggedIn === null) return "loading...";
  else return null;
}

export default Authenticate;

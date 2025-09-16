import { useNavigate } from "react-router-dom";
import { useLoggedIn } from "../context/LoggedInContext";
import { useEffect } from "react";
import useGet from "../hooks/useGet";
import { useSubjects } from "../context/SubjectsContext";

function Authenticate({ children }) {
  const { isLoggedIn, setIsLoggedIn } = useLoggedIn();
  const navigate = useNavigate();
  const { get, loading: loadingGet } = useGet();
  const { setSubjects } = useSubjects();

  useEffect(() => {
    async function getStatus() {
      const status = await get("status");
      setIsLoggedIn(status.is_authenticated);
      if (status.is_authenticated) {
        const fetchedSubjects = await get("subjects/count");
        setSubjects(fetchedSubjects);
      }
    }
    getStatus();
  }, [setIsLoggedIn]);

  useEffect(() => {
    if (loadingGet) return;
    if (isLoggedIn === false) navigate("/log-in");
  }, [loadingGet, isLoggedIn, navigate]);

  if (isLoggedIn) return <>{children}</>;
  else if (isLoggedIn === null) return "loading...";
  else return null;
}

export default Authenticate;

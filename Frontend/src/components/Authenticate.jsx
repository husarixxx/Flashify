import { useNavigate } from "react-router-dom";
import { useLoggedIn } from "../context/LoggedInContext";
import { useEffect } from "react";
import useGet from "../hooks/useGet";
import { useSubjects } from "../context/SubjectsContext";
import { useUser } from "../context/UserContext";
import { FaRegUserCircle } from "react-icons/fa";

function Authenticate({ children }) {
  const { isLoggedIn, setIsLoggedIn } = useLoggedIn();
  const navigate = useNavigate();
  const { get, loading: loadingGet } = useGet();
  const { setSubjects } = useSubjects();
  const { setUser } = useUser();

  useEffect(() => {
    async function getStatus() {
      const status = await get("status");

      if (status) {
        setIsLoggedIn(status.is_authenticated);
        if (status.is_authenticated) {
          if (status.is_authenticated) {
            setUser({ ...status, img: FaRegUserCircle });
          }
          const fetchedSubjects = await get("subjects/count");
          setSubjects(fetchedSubjects);
        }
      }
    }
    getStatus();
  }, [setIsLoggedIn, setSubjects]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const user = await get("status");
      if (user) {
        setIsLoggedIn(user.is_authenticated);
        if (user.is_authenticated) {
          setUser({ ...user, img: <FaRegUserCircle size={25} /> });
        }
      }
    }, 900000);

    return () => clearInterval(interval);
  }, [get, setIsLoggedIn, setUser]);

  useEffect(() => {
    if (loadingGet) return;
    if (isLoggedIn === false) navigate("/log-in");
  }, [loadingGet, isLoggedIn, navigate]);

  if (isLoggedIn) return <>{children}</>;
  else if (isLoggedIn === null) return "loading...";
  else return null;
}

export default Authenticate;

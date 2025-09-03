import { useEffect, useState } from "react";
import { request } from "../api/apiClient";

export default function useGetFlashcards() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const currentData = await request("http://127.0.0.1:8000/flashcards", {
          method: "GET",
          credentials: "include",
        });
        setData(currentData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, error, loading };
}

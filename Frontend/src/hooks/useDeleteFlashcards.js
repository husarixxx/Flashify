import { useEffect, useState } from "react";
import { request } from "../api/apiClient";

export default function useDeleteFlashcards(id) {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function deleteFlashcard() {
      try {
        const currentData = await request(
          `http://127.0.0.1:8000/flashcards/${id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        setData(currentData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    deleteFlashcard();
  }, [id]);

  return { data, error, loading };
}

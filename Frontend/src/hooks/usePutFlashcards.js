import { request } from "../api/apiClient";
import { useState } from "react";

export function usePutFlashcards() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function put(formData, id) {
    try {
      const currentData = await request(
        `http://127.0.0.1:8000/flashcards/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      setData(currentData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }
  return { put, error, data, loading };
}

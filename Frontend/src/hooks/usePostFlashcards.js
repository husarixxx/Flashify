import { request } from "../api/apiClient";
import { useState } from "react";

export function usePostFlashcards() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function aiPost(formData) {
    try {
      const currentData = await request(
        "http://127.0.0.1:8000/Flashcards/Generate",
        {
          method: "POST",

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
  async function singlePost(definition, explanation) {
    try {
      const currentData = await request("http://127.0.0.1:8000/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: {
          definition: definition,
          explanation: explanation,
        }.stringify(),
      });
      setData(currentData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }
  return { aiPost, singlePost, error, data, loading };
}

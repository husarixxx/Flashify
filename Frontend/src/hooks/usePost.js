import { request } from "../api/apiClient";
import { useState } from "react";

export function usePost() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function post(formData, url) {
    try {
      const currentData = await request(`api/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      setLoading(false);
      return currentData;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return { post, error, loading };
}

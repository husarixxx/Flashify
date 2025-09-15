import { request } from "../api/apiClient";
import { useState } from "react";

export default function usePut() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function put(formData, url) {
    try {
      const currentData = await request(`http://127.0.0.1:8000/api/${url}`, {
        method: "PUT",
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
  return { put, error, loading };
}

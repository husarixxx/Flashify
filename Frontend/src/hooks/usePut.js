import { request } from "../api/apiClient";
import { useState } from "react";

export default function usePut() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function put(formData, url) {
    try {
      const currentData = await request(`http://127.0.0.1:8000/${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      setData(currentData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }
  return { put, error, data, loading };
}

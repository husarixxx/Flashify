import { request } from "../api/apiClient";
import { useState } from "react";

export default function useGet() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function get(url) {
    try {
      const currentData = await request(`http://127.0.0.1:8000/api/${url}`, {
        method: "GET",
        credentials: "include",
      });
      setLoading(false);
      return currentData;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return { get, error, loading };
}

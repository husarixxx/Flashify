import { request } from "../api/apiClient";
import { useState } from "react";

export default function useGet() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function get(url) {
    try {
      const currentData = await request(`http://127.0.0.1:8000/${url}`, {
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

  return { get, data, error, loading };
}

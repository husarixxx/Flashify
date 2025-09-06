import { request } from "../api/apiClient";
import { useState } from "react";

export default function useGet() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function get(url) {
    try {
      const currentData = await request(`api/${url}`, {
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

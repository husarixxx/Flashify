import { useState } from "react";
import { request } from "../api/apiClient";

export default function useDelete() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function deleteEntity(url) {
    try {
      const currentData = await request(`http://127.0.0.1:8000/${url}`, {
        method: "DELETE",
        credentials: "include",
      });
      setData(currentData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return { deleteEntity, data, error, loading };
}

import { useState } from "react";
import { request } from "../api/apiClient";

export default function useDelete() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function deleteEntity(url) {
    try {
      const currentData = await request(`http://127.0.0.1:8000/api/${url}`, {
        method: "DELETE",
        credentials: "include",
      });
      setLoading(false);
      return currentData;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return { deleteEntity, error, loading };
}

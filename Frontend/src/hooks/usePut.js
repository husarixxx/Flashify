import { request } from "../api/apiClient";
import { useState } from "react";

export default function usePut() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // change api to real address after backend is finished
  async function put(formData, url) {
    try {
      const currentData = await request(`api/${url}`, {
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

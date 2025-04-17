import { useState, useCallback } from "react";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const signUp = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(
        "https://networkscanner.reesenorr.is/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
          redirect: "follow",
        }
      );

      const result = await res.text();
      setResponse(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { signUp, loading, error, response };
};

export default useSignUp;

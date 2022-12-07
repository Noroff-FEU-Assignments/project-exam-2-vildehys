import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useApi = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);

  const fetchApi = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const json = await response.json();
        setData(json);
      } else {
        setError(`There was an API error`);
      }
    } catch (err) {
      setError(`There was an API error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { loading, data, error };
};

export default useApi;

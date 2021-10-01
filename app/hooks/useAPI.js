import { useState } from "react";

const useAPI = (apiFunc, args = undefined) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const request = async (args) => {
    const response = await apiFunc(args);
    setLoading(false);

    setError(!response.ok);
    setData(response.data);
    return response;
  };

  return { request, data, error, loading };
};

export default useAPI;

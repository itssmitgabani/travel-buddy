import { useEffect, useState } from "react";
import axios from "axios";

const useFetch1 = (url) => {
  const [data1, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
        setData(res);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [`${process.env.REACT_APP_BASE_URL}${url}`]);


  return { data1, loading, error };
};

export default useFetch1;

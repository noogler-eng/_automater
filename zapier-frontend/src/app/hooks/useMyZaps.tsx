import axios from "axios";
import { useEffect, useState } from "react";

function useMyZaps() {
  const [isLoading, setIsLoading] = useState(false);
  const [myzaps, setMyzaps] = useState(null);
  const [isError, setIsError] = useState(null);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ZAP_ENVIRONEMNT}/api/v1/zap` || "",
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      setMyzaps(res.data.zaps.zaps);
      setIsError(null);
    } catch (e: any) {
      console.log(e);
      setIsError(e);
      setMyzaps(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { myzaps, isLoading, isError };
}

export default useMyZaps;

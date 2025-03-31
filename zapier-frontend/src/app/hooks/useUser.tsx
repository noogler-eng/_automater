import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setuser] = useState(null);
  const [isError, setIsError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ZAP_ENVIRONEMNT}/api/v1/user` || "",
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      setuser(res.data.user);
      setIsError(null);
    } catch (e: any) {
      console.log(e);
      setIsError(e);
      setuser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  console.log(":::::", user);

  return { user, isLoading, isError, setuser };
}

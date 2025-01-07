"use client";
import Loader from "../components/Loader";
import useUser from "../hooks/useUser";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const navigate = useRouter();
  const { user, isLoading, isError } = useUser();

  if (isLoading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user || isError) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center">
        <span className="text-4xl">!ohhh</span>
        <p className="text-2xl">Please sign in to access dashboard</p>
        <button
          className="px-8 py-2 text-xl rounded-full bg-orange-700 mt-3"
          onClick={() => {
            navigate.push("/signin");
          }}
        >
          signin
        </button>
      </div>
    );
  }

  return <div className="p-8">dashboard...</div>;
}

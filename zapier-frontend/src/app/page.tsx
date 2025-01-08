"use client";
import { useRouter } from "next/navigation";
import { Brands } from "./components/Brands";
import Videos from "./components/Videos";
import Boards from "./components/Boards";
import useUser from "./hooks/useUser";

export default function Home() {
  const navigate = useRouter();
  const { user, isLoading, isError } = useUser();

  if (isError) {
    return <div>error....</div>;
  }

  return (
    <div>
      <div className="p-6 w-full flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-1">
          <h2 className="md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-700 bg-clip-text text-transparent shadow-lg transform transition-transform duration-500 ease-in-out hover:scale-105 mt-5">
            Automate as fast as you can type!
          </h2>
          <p className="md:text-2xl text-wrap w-5/6 text-center font-thin">
            Ai gives you the superpower of automation, Automator implies them
            and makes your work easy
          </p>
        </div>
        <div className="flex justify-center justify-center w-5/6 p-4 gap-4">
          <div className="flex flex-col items-center w-1/2 justify-center gap-3">
            <h2 className="text-xl text-wrap text-center">
              Turn chaos into smooth operations by automating workflows
              yourself—no developers, no IT tickets, no delays. The only limit
              is your imagination.
            </h2>
            <div className="flex gap-2">
              {user ? (
                <button
                  className="px-4 py-2 text-xl rounded-full bg-orange-700"
                  onClick={() => {
                    navigate.push("/dashboard");
                  }}
                >
                  dashboard
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 text-xl rounded-full bg-orange-700"
                    onClick={() => {
                      navigate.push("/signup");
                    }}
                  >
                    get start free with email
                  </button>
                  <button
                    className="px-4 py-2 text-xl rounded-full border border-gray-500"
                    onClick={() => {
                      navigate.push("/signin");
                    }}
                  >
                    log in
                  </button>
                </div>
              )}
            </div>
          </div>
          <img
            src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1726210651/Homepage%20%E2%80%94%20Sept%202024/homepage-hero_vvpkmi.png"
            className="w-4/12 h-4/12 rounded-xl"
          />
        </div>
        <div>
          <Videos />
        </div>
        <div className="flex flex-col items-center text-gray-300">
          <h2>
            More than 2.2 million companies worldwide already trust Automater
          </h2>
          <Brands />
        </div>
        <div className="px-24 mb-4 flex flex-col items-center gap-4">
          <h2 className="text-3xl">Meet our Automation Products</h2>
          <Boards />
        </div>
      </div>
    </div>
  );
}

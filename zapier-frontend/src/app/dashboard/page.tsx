"use client";
import Loader from "../components/Loader";
import useMyZaps from "../hooks/useMyZaps";
import useUser from "../hooks/useUser";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";

export default function Dashboard() {
  const navigate = useRouter();
  const { user, isLoading, isError } = useUser();
  const { myzaps, isLoading: zapsLoading, isError: zapError } = useMyZaps();


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

  const zaps =
    myzaps &&
    //@ts-ignore
    myzaps?.map(
      (
        item: {
          actions: {
            ActionId: string;
            id: string;
            sortingOrder: number;
            type: {
              id: string;
              name: string;
            };
          }[];
          id: string;
          trigger: {
            id: string;
            zapId: string;
            triggerId: string;
            type: {
              id: string;
              name: string;
            };
          };
          triggerId: string;
          userId: string;
        },
        index: number
      ) => {
        return (
          <div
            key={index}
            className="p-4 flex flex-col w-1/2 border border-gray-600 rounded-lg drop-shadow-2xl"
          >
            <div className="flex justify-between items-center bg-orange-700 px-1">
              <div className="flex gap-2">
                <p className="underline">Zap:</p>
                <div>{item.trigger.type.name}</div>
              </div>
              <div>
                <MoveRight
                  size={20}
                  onClick={() => {
                    navigate.push(`/dashboard/zap/${item.id}`);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="underline">Actions:</p>
              {item.actions.map((internalItems, internalIndex: number) => {
                return (
                  <div
                    className="flex justify-between w-full bg-indigo-600 px-1"
                    key={internalIndex}
                  >
                    <p>{internalItems.sortingOrder + 1}</p>
                    <p>{internalItems.type.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    );

  return (
    <div className="p-8 flex justify-center">
      <div className="w-4/6">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-4xl font-extrabold">My zaps!</h1>
          <button
            className="px-8 py-2 text-xl rounded-full border text-white hover:bg-orange-700 hover:text-white mt-3"
            onClick={() => {
              navigate.push("/dashboard/zap/create");
            }}
          >
            create new zap
          </button>
        </div>
        <div className="w-full flex justify-center mt-12">{zaps}</div>
      </div>
    </div>
  );
}

"use client";
import ZapCell from "@/app/components/ZapCell";
import { useState } from "react";
import Link from "next/link";

export default function CreateZap() {
  const [selectedTrigger, setSelectedTrigger] = useState("");
  const [selectedActions, setSelectedActions] = useState<
    {
      availableActionId: string;
      availableActionName: string;
      actionMetadata: any;
    }[]
  >([]);

  return (
    <div className="flex-grow flex p-10">
      <div className="bg-slate-200 rounded-lg w-fit px-10 py-4 flex flex-col gap-4 items-center">
        <ZapCell
          name={selectedTrigger ? "webhooks" : "select trigger"}
          index={1}
        />
        {selectedActions.map((action, index) => {
          return (
            <ZapCell
              name={
                action.availableActionName
                  ? action.availableActionName
                  : "select actions"
              }
              index={1 + index}
              color={"bg-orange-200"}
            />
          );
        })}
        <button
          className="p-2 w-full flex flex gap-5 bg-white text-black items-center justify-center px-8 border-2 border-black bg-orange-700"
          onClick={() => {
            setSelectedActions((a) => [
              ...a,
              {
                availableActionId: "",
                availableActionName: "",
                actionMetadata: "",
              },
            ]);
          }}
        >
          <div className="">+</div>
        </button>
      </div>
    </div>
  );
}

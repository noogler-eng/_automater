"use client";
import ZapCell from "@/app/components/ZapCell";
import { useState } from "react";
import Modal from "@/app/components/Modal";

export default function CreateZap() {
  const [selectedTrigger, setSelectedTrigger] = useState<{
    availableTriggerId: string;
    availableTriggerName: string;
    triggerMetadata: any;
  }>();
  const [selectedActions, setSelectedActions] = useState<
    {
      availableActionId: string;
      availableActionName: string;
      actionMetadata: any;
    }[]
  >([]);
  const [currentModalState, setModalState] = useState(1);

  const handlePublishActionsAndTriggers = async () => {
    console.log("Publishing actions and triggers...");
    console.log("Selected Trigger:", selectedTrigger);
    console.log("Selected Actions:", selectedActions);
  };

  return (
    <div className="flex-grow flex p-10 min-h-screen">
      <div className="bg-slate-200 rounded-lg w-fit px-10 py-4 flex flex-col gap-4 items-center">
        <ZapCell
          name={
            selectedTrigger
              ? selectedTrigger.availableTriggerName
              : "select trigger"
          }
          index={1}
          setModalState={setModalState}
          color={"bg-white text-black"}
        />
        {selectedActions.map((action, index) => {
          return (
            <ZapCell
              name={
                action.availableActionName
                  ? action.availableActionName
                  : "select actions"
              }
              index={2 + index}
              color={"bg-orange-200 text-black"}
              setModalState={setModalState}
              key={index}
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
      <div className="w-full pl-5 flex-grow flex flex-col">
        <Modal
          index={currentModalState}
          actio={selectedActions}
          setSelectedTrigger={setSelectedTrigger}
          setSelectedActions={setSelectedActions}
          handlePublishActionsAndTriggers={handlePublishActionsAndTriggers}
        />
      </div>
    </div>
  );
}

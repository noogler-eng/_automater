"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Modal({
  index,
  actio,
  setSelectedTrigger,
  setSelectedActions,
}: {
  index: number;
  actio: any;
  setSelectedTrigger: any;
  setSelectedActions: any;
}) {
  const [triggers, setTrigger] = useState<
    {
      id: string;
      name: string;
      image: string;
    }[]
  >();
  const [actions, setActions] = useState<
    {
      id: string;
      name: string;
      image: string;
    }[]
  >();

  const [trigger, settrigger] = useState<{
    id: string;
    name: string;
    image: string;
  }>();
  const [action, setAction] = useState<{
    id: string;
    name: string;
    image: string;
  }>();

  const triggersData = async () => {
    const res = await axios.get(
      "http://localhost:5050/api/v1/trigger/availableTriggers"
    );
    setTrigger(res.data.availableTriggers);
  };

  const actionsData = async () => {
    const res = await axios.get(
      "http://localhost:5050/api/v1/action/availableActions"
    );
    setActions(res.data.availableActions);
  };

  useEffect(() => {
    triggersData();
    actionsData();
  }, []);

  return (
    <div className="border w-full flex-grow p-2 rounded-lg relative">
      <div className="py-1 px-4 w-fit bg-orange-700 text-white">
        Block.No: {index}
      </div>
      {index == 1 ? (
        <div className="flex flex-col mt-4">
          <h1 className="text-4xl">Trigger</h1>
          <p className="text-gray-300 text-sm">
            select your trigger from the available triggers
          </p>
          {triggers &&
            triggers.map(
              (
                item: {
                  id: string;
                  name: string;
                  image: string;
                },
                ind
              ) => {
                return <div key={ind}>{item.name}</div>;
              }
            )}
          <button
            className="px-8 py-2 text-xl rounded-full bg-orange-700 mt-3 border absolute bottom-2"
            onClick={() => {
              setSelectedTrigger({
                availableTriggerId: "cat",
                availableTriggerName: "cat",
                triggerMetadata: "cat",
              });
            }}
          >
            {index == 1 ? "set trigger" : "set action"}
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl mt-4">Actions</h1>
          <p className="text-gray-300 text-sm">
            select your Actions from the available actions
          </p>
          {actions &&
            actions?.length > 0 &&
            actions.map(
              (
                item: {
                  id: string;
                  name: string;
                  image: string;
                },
                ind
              ) => {
                return <div key={ind}>{item.name}</div>;
              }
            )}
          <button
            className="px-8 py-2 text-xl rounded-full bg-orange-700 mt-3 border absolute bottom-2"
            onClick={() => {
              const arr = [...actio]; // Clone the existing array
              arr[index - 2] = {
                // Update the object at the specific index
                availableActionId: "sharad",
                availableActionName: "sharad",
                actionMetadata: "sharad",
              };
              setSelectedActions(arr);
            }}
          >
            {index == 1 ? "set trigger" : "set action"}
          </button>
        </div>
      )}
    </div>
  );
}

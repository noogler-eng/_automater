"use client";
import { useParams } from "next/navigation";

export default function Zap() {
  const param = useParams<{ id: string }>();

  return <div className="p-8 flex justify-center">{param.id}</div>;
}

"use client"

import type React from "react"

import { FaBoltLightning } from "react-icons/fa6"
import { FaFoursquare } from "react-icons/fa"
import { SiPrintables } from "react-icons/si"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

export default function Boards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const data: {
    comp: React.ReactNode
    name: string
    def: string
    to: string
  }[] = [
    {
      comp: <FaBoltLightning />,
      name: "Zaps",
      def: "Automate advanced workflows with the full building power of Zapier.",
      to: "/",
    },
    {
      comp: <FaFoursquare />,
      name: "Interfaces",
      def: "Build professional apps, forms, and web pages that easily connect to your Zaps and Tables.",
      to: "/",
    },
    {
      comp: <SiPrintables />,
      name: "Tables",
      def: "Get more storage and control of the data that powers your automated workflows.",
      to: "/",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 py-4">
      {data.map((item, index) => (
        <div
          className="flex flex-col bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] hover:bg-zinc-700"
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="p-6 flex-1 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl text-orange-400 bg-orange-400/10 p-3 rounded-lg">{item.comp}</div>
              <h2 className="text-2xl font-bold text-white">{item.name}</h2>
            </div>

            <p className="text-base text-zinc-400 mb-6 flex-grow">{item.def}</p>

            <Link
              href={item.to}
              className="flex items-center text-orange-400 font-medium hover:underline gap-1.5 mt-auto group"
            >
              <span>Explore {item.name}</span>
              <ArrowRight
                className={`h-4 w-4 transition-transform duration-300 ${
                  hoveredIndex === index ? "transform translate-x-1" : ""
                }`}
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from 'lucide-react'
import useUser from "./hooks/useUser"
import Videos from "./components/Videos"
import { Brands } from "./components/Brands"
import Boards from "./components/Boards"
export default function Home() {
  const router = useRouter()
  const { user, isError } = useUser()

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-900/30 text-red-400">
          <h3 className="text-lg font-medium">Something went wrong</h3>
          <p className="mt-2">We couldn't load your user information. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="flex flex-col items-center w-full bg-black text-zinc-100">
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-4 md:px-6 py-12 md:py-20">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-6 tracking-tight">
            Automate as fast as you can type!
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl">
            AI gives you the superpower of automation, Automator implements them and makes your work easy
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex flex-col items-center md:items-start w-full md:w-1/2 space-y-6">
            <p className="text-base md:text-lg text-center md:text-left text-zinc-300">
              Turn chaos into smooth operations by automating workflows yourself—no developers, no IT tickets, no delays. 
              The only limit is your imagination.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {user ? (
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-6 py-3 rounded-full bg-orange-600 text-white font-medium flex items-center justify-center gap-2 hover:bg-orange-500 transition-colors"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => router.push("/signup")}
                    className="px-6 py-3 rounded-full bg-orange-600 text-white font-medium flex items-center justify-center gap-2 hover:bg-orange-500 transition-colors"
                  >
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => router.push("/signin")}
                    className="px-6 py-3 rounded-full border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition-colors font-medium text-zinc-200"
                  >
                    Log In
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <div className="relative aspect-[4/3] w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-[0_0_20px_rgba(255,165,0,0.15)]">
              <img
                src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1726210651/Homepage%20%E2%80%94%20Sept%202024/homepage-hero_vvpkmi.png"
                alt="Automation platform interface"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="w-full bg-zinc-900 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Videos />
        </div>
      </section>

      {/* Brands Section */}
      <section className="w-full py-16 bg-black border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center">
          <h2 className="text-lg md:text-xl text-zinc-400 mb-8 text-center">
            More than 2.2 million companies worldwide already trust Automater
          </h2>
          <Brands />
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full py-16 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-zinc-100">Meet our Automation Products</h2>
          <p className="text-zinc-400 mb-12 text-center max-w-2xl">
            Powerful tools designed to streamline your workflow and boost productivity
          </p>
          <Boards />
        </div>
      </section>
    </main>
  )
}

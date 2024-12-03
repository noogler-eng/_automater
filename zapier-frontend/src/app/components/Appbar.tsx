"use client"
import { useRouter } from "next/navigation";
import { FaEarthAsia } from "react-icons/fa6";

export default function Appbar() {
  
  const navigate = useRouter();
  
  return (
    <div className="flex justify-between p-6 items-center border-b border-gray-600">
      <div>
        <h2 className="text-3xl">_Automater</h2>
      </div>
      <div className="flex gap-4 items-center">
        <FaEarthAsia size={24}/>
        <div className="">contact sales</div>
        <button className="px-4 py-2 text-sm rounded-full border border-gray-500" onClick={()=>{
          navigate.push('/signin')
        }}>
          Log in
        </button>
        <button className="px-4 py-2 text-sm rounded-full bg-orange-700" onClick={()=>{
          navigate.push('/signup')
        }}>
          Sign up
        </button>
      </div>
    </div>
  );
}

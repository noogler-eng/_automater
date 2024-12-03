'use client'
import { useState, useRef } from "react"
import videosWithData from "../utils/videoData";
import clsx from "clsx";

export default function Videos(){
    
    const [current, setCurrent] = useState<{
        name: string,
        link: string,
        def: string
    }>(videosWithData[0]);
    {console.log(current.link)}

    const videoRef = useRef<HTMLVideoElement | null>(null);


    return <div className="flex flex-col items-center gap-3">
        <div className="">
            <video autoPlay width={800} loop={true} ref={videoRef}> 
                <source src={current.link} type="video/mp4"/>    
            </video>    
        </div>    
        <div className="flex gap-3 items-center">
            {videosWithData.map((p, index)=>{
                return <button key={index} onClick={()=>{
                    setCurrent(p)
                    if (videoRef.current) {
                        videoRef.current.src = p.link;
                        videoRef.current.load();
                        videoRef.current.play().catch(err => {
                            console.error("Error attempting to play:", err);
                        });
                    }
                }} className={clsx('px-4 py-2 text-sm rounded-full', p.name == current.name? "bg-orange-700" : "border hover:bg-orange-700")}>{p.name}</button>
            })}
        </div>
            <div className="text-wrap">{current.def}
        </div>
    </div>
}
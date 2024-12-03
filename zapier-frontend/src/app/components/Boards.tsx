import { FaBoltLightning } from "react-icons/fa6";
import { FaFoursquare } from "react-icons/fa";
import { SiPrintables } from "react-icons/si";
import Link from "next/link";

export default function Boards(){
    
    const data: {
        comp: React.ReactNode,
        name: string,
        def: string,
        to: string
    }[] = [{
        comp: <FaBoltLightning />,
        name: 'Zaps',
        def: 'Automate advanced workflows with the full building power of Zapier.',
        to: '/'
    },{
        comp: <FaFoursquare />,
        name: 'Interfaces',
        def: 'Build professional apps, forms, and web pages that easily connect to your Zaps and Tables.',
        to: '/'
    }, {
        comp: <SiPrintables />,
        name: 'Tables',
        def: 'Get more storage and control of the data that powers your automated workflows.',
        to: '/'
    }]
    
    
    
    
    return <div className="grid grid-cols-3 gap-12">
        { data.map((item, index)=>{
            return <div className="flex flex-col bg-emerald-950 p-8 text-2xl gap-8 rounded-xl" key={index}>
                <div className="flex gap-1 items-center">
                    <span className="text-orange-700 text-extrabold">{item.comp}</span>
                    <h2 className="text-extrabold text-4xl">{item.name}</h2>
                </div>
                <p className="text-xl text-wrap">{item.def}</p>
                <div className="flex gap-1 place-items-end text-xl">
                    <Link href={item.to} className="underline">{item.name} Explore</Link>
                    <div>{'->'}</div>
                </div>
            </div>
        }) }
    </div>
}
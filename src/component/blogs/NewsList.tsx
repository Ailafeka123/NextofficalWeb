"use client"

import { useLocale  } from "next-intl"
import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "@/i18n/navigation";

type NewData = {
    id:string,
    title:string,
    date:string,
}


export default function NewsList(){
    const local = useLocale();
    const [loading,setLoading] = useState<boolean>(false);
    const [newData, setNewData] = useState<NewData[]>([]);
    const [showNumber , setShowNumber] = useState<number>(0);
    const [moreLoading , setMoreLoading] = useState<boolean>(true);
    const moreRef = useRef<HTMLDivElement|null>(null);
    useEffect(()=>{
        if(loading) return;
        const getData = async()=>{
            const res = await fetch(`/api/news?local=${local}`);
            const data = await res.json();
            setNewData(data);
            if(data.length > 5){
                setShowNumber(5)
            }else{
                setShowNumber(data.length)
            }
            setLoading(true);
        };
        getData();
    },[])
    const showdata:NewData[] = useMemo(()=>{
        const temp:NewData[] = [];
        for(let i = 0 ; i < showNumber ; i++){
            temp.push(newData[i])
        }
        return temp;
    },[newData,showNumber])

    return(
        <article className="flex flex-col items-center justify-start w-full px-[32px] gap-[16px]">
            {loading?
                showdata.map( (index,key) =>{
                    return(
                        <Link href={`/blog/${index.id}`} locale={local} key={`Link-${key}`} className="w-full">
                            <section key={`${key}`} className="w-full flex flex-col h-[100px] border rounded-md p-[16px] gap-[8px] bg-[var(--background-2)] hover:bg-[var(--background-3)]">
                                <h3 className="text-xl">{index.title}</h3>
                                <p className="">{index.date}</p>
                            </section>
                        </Link>
                    )
                })
            :<h2 className="text-3xl">查無資料</h2>}

            {/* {loading && showdata.length > 1 &&
            <div className="w-[10px] h-[10px] border" ref={moreRef}>
            </div>} */}
        </article>
    )
}
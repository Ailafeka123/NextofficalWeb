"use client";
import { useLocale  } from "next-intl"
import { usePathname } from "@/i18n/navigation";
import { useState, useEffect } from "react";

type NewData = {
    id:string,
    title:string,
    date:string,
    context:string[]
}
export default function NewsDataShow(){
    const local = useLocale();
    const pathname = usePathname();
    const [loading,setLoading] = useState<boolean>(false);
    const [newData, setNewData] = useState<NewData>();
    const [state,setState] = useState<boolean>(false);
    useEffect(()=>{
        if(loading)return;
        const getData = async()=>{
            const path = pathname.split("/");
            const id = path[path.length-1];
            try{
                const res = await fetch(`/api/news/${id}?local=${local}`);
                const data = await res.json();
                setNewData(data);
            }catch(e){
                setState(true);
            }finally{
                setLoading(true);
            }
        };
        getData();
    },[])
    return (
        <>

        {loading === false?<h2 className="text-3xl">Loading</h2>
        :state?<h2 className="text-3xl">查無資料</h2>
        :newData?
            <article className="flex flex-col items-center justify-start gap-[16px]">
                <h2 className="text-2xl">{newData.title}</h2>
                <h3 className="text-xl">{newData.date}</h3>
                <section className="flex flex-col items-start justify-start gap-[16px] px-[16px]">
                    {newData.context.map((index:string,key:number)=>{
                        return(<p key={`${key}`} className="text-xl">{index}</p>)
                    })}  
                </section>
            </article>
            :<h2></h2>
        }
        </>
    )
}
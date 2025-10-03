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
    // loading => 畫面資料讀取完成
    const [loading,setLoading] = useState<boolean>(false);
    // 存放所有資料清單
    const [newData, setNewData] = useState<NewData[]>([]);
    // 要展示多少筆資料
    const [showNumber , setShowNumber] = useState<number>(0);

    // 是否要載入更多資料
    const [moreLoading, setMoreLoading] = useState<boolean>(false);
    // 是否有更多資料
    const moreData = useRef<boolean>(false);
    // 持續載入的div
    const moreRef = useRef<HTMLDivElement|null>(null);

    useEffect(()=>{
        if(loading) return;
        const getData = async()=>{
            const res = await fetch(`/api/news?local=${local}`);
            const data = await res.json();
            setNewData(data);
            if(data.length > 5){
                setShowNumber(5)
                moreData.current = true;
            }else{
                setShowNumber(data.length)
            }
            setLoading(true);
        };
        getData();
        
        const observer = new IntersectionObserver((observe,obs)=>{
            observe.forEach((index)=>{
                if(index.isIntersecting){
                    if(moreData.current){
                        console.log("繼續刷新資料")
                        setMoreLoading(true);
                    }
                }
            })
        },{threshold:1})

        if(moreRef.current){
            observer.observe(moreRef.current)
        }
        return(()=>{
            if(moreRef.current){
                observer.unobserve(moreRef.current)
            }
        })

    },[])

    useEffect(()=>{
        if(moreLoading === false)return;
        console.log(`moreData = ${moreData.current}`);
        if(moreData.current){
            setShowNumber(index=>{
                const nextNum = index+5;
                if(newData.length > nextNum){
                    return nextNum
                }else{
                    moreData.current = false;
                    return newData.length
                }
            })
            setMoreLoading(false);
        }
    },[moreLoading])
    // 這裡是要顯示的資料
    const showdata:NewData[] = useMemo(()=>{
        const temp:NewData[] = [];
        for(let i = 0 ; i < showNumber ; i++){
            temp.push(newData[i])
        }
        return temp;
    },[newData,showNumber])

    return(
        <>
            <article className="flex flex-col items-center justify-start w-full px-[32px] gap-[16px] min-h-svh">
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

            </article>
            <div className="w-full flex flex-col items-center" ref={moreRef}>
                {moreData.current === false &&<h3 className="text-2xl">無更多資料</h3>}
            </div>
        </>
    )
}
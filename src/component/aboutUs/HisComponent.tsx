"use client";


import { useState, useEffect,useRef } from "react";
import { useTranslations } from "next-intl";
export default function HisComponent(){
    const t = useTranslations("aboutus");
    const his :{date:string,description:string}[] = t.raw("history");
    const [hisState,setHisState] = useState<boolean[]>(Array(his.length).fill(false))
    const hisRef = useRef<HTMLDivElement[]>([]);
    useEffect(()=>{
        const observer = new IntersectionObserver((observe,obs)=>{
            observe.forEach((index)=>{
                const key = hisRef.current.indexOf(index.target as HTMLDivElement);
                if(index.isIntersecting){
                        setHisState(index=>{
                            const temp = [...index];
                            temp[key] = true;
                            return temp;
                        });
                        obs.unobserve(index.target);
                    }
            })
        },{threshold:0.8})
         if(hisRef.current){
            hisRef.current.forEach(index=>{
                observer.observe(index)
            })
            
        }
        return (()=>{
            if(hisRef.current){
                 hisRef.current.forEach(index=>{
                    observer.unobserve(index)
                })
            }
        })
    },[])

    return (
        <section className="flex flex-col gap-[16px] px-[16px] md:p-0 relative w-full ">

            { his.map((index,key)=>{
                return(
                        <div ref={(el)=>{ if(el){hisRef.current[key] = el}}} key={`his-${key}`} className={`flex flex-col ${key %2 === 0 ? "md:flex-row" :"md:flex-row-reverse"} md:min-h-[200px] items-center justify-between gap-[8px] p-[16px] border-2 md:border-0 rounded-md bg-[var(--background-2)] md:bg-[var(--background)] transition-all duration-500 ease-out ${hisState[key]?"translate-y-0 opacity-100":" translate-y-[100%] opacity-0"}`}>
                            <div key={`hisDate-${key}`}  className={`md:basis-5/12 flex md:flex-row ${key %2 === 0? "justify-end" : "justify-start"}`}>
                                <p className=" md:bg-[var(--background-2)]  p-[8px] md:border-2 rounded-md w-full md:w-auto">{index.date}</p>
                            </div>
                            <div key={`hisDes-${key}`} className=" md:basis-5/12 "  >
                                <p className="md:bg-[var(--background-2)] text-center md:border-2 rounded-md">{index.description}</p>
                            </div>
                        </div>

                )
                })
            }

            <div className="absolute hidden md:block h-full w-[100px] bg-green-500 left-[50%] top-0 -translate-x-[50%]">

            </div>
        </section>
    )
}
"use client";
import { useState,useEffect,useRef } from "react";
import { isNull } from "util";

export default function ShowData(){
    const [see,setSee] = useState<boolean>(false);
    const [state,setState] = useState<number[]>([0,0,0])
    const seeRef = useRef<null|HTMLDivElement>(null);
    const complate = useRef<boolean>(false);
    // 初始化 放入監聽
    useEffect(()=>{
        const temp = seeRef.current;
        if(temp === null){
            return;
        }
        const observe = new IntersectionObserver(
            (observe,obs)=>{
                observe.forEach(index=>{
                    if(index.isIntersecting){
                        setSee(true);
                        obs.unobserve(index.target);
                    }else{
                        setSee(false)
                    }  
                })
        },{threshold:0.8})
        if(seeRef.current){
            observe.observe(seeRef.current)
        }
        return (()=>{
            if(seeRef.current){
                observe.unobserve(seeRef.current);
            }
        })
    },[])
    // 當完全進入視野時啟用
    useEffect(()=>{
        if(see === false){
            setState([0,0,0]);
            complate.current = true;
        }else{
            complate.current = false;
            let timeUse:number;
            const animation = ()=>{
                setState(index=>{
                    const temp = [...index];
                    if(temp[0] < 75){
                        temp[0]++;
                        complate.current = false
                    }
                    if(temp[1] < 90){
                        temp[1]++;
                        complate.current = false
                    }
                    if(temp[2] < 60){
                        temp[2]++;
                        complate.current = false
                    }

                    if(temp[0] === 75 &&  temp[1] === 90 && temp[2] === 60){
                        complate.current = true;
                    }
                    return temp;
                })
                if(!complate.current){
                    timeUse = requestAnimationFrame(animation)
                }
            }
            timeUse = requestAnimationFrame(animation);
            return(()=>{
                cancelAnimationFrame(timeUse);
            })
        }
    },[see])

    return(
        <section className="w-full grid grid-cols-3 mt-[32px] md:m-[16px] gap-[16px] " ref={seeRef}>
            {state.map((index,key)=>{
                return(
                    <div className="flex flex-col md:flex-row aspect-square  w-full h-full items-center justify-center gap-[8px] relative" key={`circle-${key}`}>
                        <div className="grid grid-cols-1 grid-rows-1 place-items-center aspect-square md:flex-8/12 w-full">
                            <div className="col-start-1 row-start-1 aspect-square w-full rounded-full border-10 border-gray-100 dark:border-gray-700"></div>
                            <div className={`col-start-1 row-start-1 aspect-square w-full rounded-full border-10 border-amber-500 transition-all duration-500 ease-in  dark:border-amber-400`} 
                            style={{WebkitMaskImage: `conic-gradient(from 0deg, black ${see? `${index}%` : '0%'}, transparent ${see? `${index}%` : '0%'})`
                            ,maskImage: `conic-gradient(from 0deg, black ${see? `${index}%` : '0%'}, transparent ${see? `${index}%` : '0%'})`
                            ,transition: 'mask-image 0.5s ease-in, -webkit-mask-image 0.5s ease-in'}}></div>
                            <div>

                            </div>
                        </div>
                        <div className=" md:flex-4/12 absolute md:relative flex flex-col items-center justify-center">
                            <h3 className="text-2xl">{index}%</h3>
                            
                        </div>
                    </div>
                )
            })}
        </section>
    )
}
"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
export default function OurTeam(){
    const t = useTranslations("aboutus");
    const team:{name:string,description:string}[] = t.raw("team");
    const [state,setState] = useState<boolean[]>(Array(team.length).fill(false));
    const clickCard = (num:number = -1)=>{
        if(num === -1 || num >= team.length){
            setState(Array(team.length).fill(false))
        }else{
            if(state[num] === true){
                setState(Array(team.length).fill(false))
            }else{
                const temp = Array(team.length).fill(false);
                temp[num] = true;
                setState(temp)
            }
        }

    }
    return(
        <section className="flex flex-col md:flex-row gap-[16px] w-full min-h-[300px] items-center justify-around">
            {team.map((index,key)=>{
                return(
                    <div key={`${index.name}-${key}`} className={`basis-3/12 relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${state[key]?"[transform:rotateY(180deg)]":""} p-[16px] md:p-0`} onClick={()=>{clickCard(key)}}>
                        <div className=" bg-[var(--background-2)] relative backface-hidden w-full h-[300px] p-[8px] flex flex-col items-center justify-center text-center">
                            <h3 className="text-2xl">{index.name}</h3>
                        </div>
                        <div className=" bg-green-600 absolute backface-hidden [transform:rotateY(180deg)]  w-full h-full top-0 left-0 p-[8px] flex items-center justify-center">
                            <p>{index.description}</p>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}
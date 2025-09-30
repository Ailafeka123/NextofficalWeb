'use client'

import { useState,useEffect } from "react"
import { memo } from "react"
type inputStringType = {
    inputString:string,
    showState : boolean
    onShowState : (value:boolean) => void,
}

const AlterComponent = memo( ({inputString,showState,onShowState} :inputStringType) =>{
    const [moveIn ,setMoveIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean> (false);
    useEffect(()=>{
        if(loading){
            return;
        }
        if(showState === false){
            return ;
        }
        if(showState){
            setLoading(true);
        }
        setMoveIn(true);
        setTimeout(()=>{
            setMoveIn(false)
            setLoading(false);
        },2000)
        setTimeout(()=>{
            onShowState(false);
        },2500)
    },[showState])
    return (
        <div className= {`
            fixed top-9/12 left-1/2 p-[16px] bg-[var(--background-2)] z-1001 border-1 rounded-md 
            transition duration-500   ${moveIn ? "opacity-100 -translate-x-1/2 -translate-y-0" : "opacity-0 -translate-x-1/2 -translate-y-1/2"} `}>
            <p>{inputString}</p>
        </div>
    )
})


AlterComponent.displayName = "AlterComponent";
export default AlterComponent;
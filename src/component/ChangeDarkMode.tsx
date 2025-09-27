"use client"
import { DarkModeContext } from "@/context/DarkModeContext";
import { useState, useEffect, useContext } from "react"
import Image from "next/image";
export default function ChangeDarkMode(){
    // 光暗控制
    const [darkMode, setDarkMode] = useState<boolean>(false);
    // 跳出來的動畫控制
    const [darkModeOpen,setDarkModeOpen] = useState<boolean>(false);
    // 旋轉冷卻
    const [changeColdDown,setChangeColdDown] = useState<boolean>(false);
    const {darkModeContext,setDarkModeContext,darkModeContextLoading} = useContext(DarkModeContext)
    // 讀取完成 則修改模式
    useEffect(()=>{
        if(darkModeContextLoading === false) return;
        setDarkMode(darkModeContext);
    },[darkModeContextLoading])
    // 開啟選單與全轉
    const openModeChose = (state:boolean|null = null) =>{
        if(changeColdDown) return;
        setChangeColdDown(true);
        if(state === null){
            setDarkModeOpen(!darkModeOpen);
        }else{
            setDarkModeOpen(state)
        }
        setTimeout(()=>{
            setChangeColdDown(false);
        },500)
    }
    // 轉換模式
    const changeDarkModeClick = (state:boolean) =>{
        setDarkMode(state);
        setDarkModeContext(state);
        if(state){
            document.documentElement.classList.add("dark");
        }else{
            document.documentElement.classList.remove("dark")
        }
    }


    return (
        <div className={`fixed right-1 top-[50%] -translate-y-[50%]  ${darkModeOpen? darkMode?"size-20 rotate-540":"size-20  rotate-360":"size-15  translate-x-[50%]"}   grid grid-rows-1 grid-cols-3  transition-all duration-500 ease-in-out z-990`} 
        onClick={()=>{openModeChose()}}>
            {/* <h2>這是mode</h2> */}
            {/* <div className="grid grid-cols-1 grid-rows-1">
                <div className="col-start-1 row-start-1 size-12 rounded-full border-4 border-gray-100 dark:border-gray-700"></div>
                <div className="col-start-1 row-start-1 size-12 rounded-full border-4 border-amber-500 mask-conic-from-75% mask-conic-to-100% dark:border-amber-400"></div>
            </div> */}
            <div className="col-span-3 col-start-1 row-start-1  border-30  rounded-full border-[var(--background-3)]">
                
            </div>
            <div className={`col-span-3 col-start-1 row-start-1 flex items-center justify-center w-full h-full`}>
                <Image className={` mx-auto ${darkModeOpen?"size-0":"block cursor-pointer"}`} src={darkMode?"/DarkAndLight/moon_dark.svg":"/DarkAndLight/sum_light.svg"} width={40} height={40} alt="darkModeIcon"></Image>
            </div>

            <div className={`col-span-1 col-start-1 row-start-1 flex items-center justify-center ${darkModeOpen?"flex":"hidden"} ${darkMode?"rotate-180":""}`}>
                <Image className="cursor-pointer" src={darkMode?"/DarkAndLight/moon_dark.svg":"/DarkAndLight/moon_light.svg"} width={40} height={40} alt="darkModeIcon" onClick={()=>{changeDarkModeClick(true)}}></Image>
            </div>
            <div className="col-span-1 col-start-3 row-start-1 flex items-center justify-center">
                <Image className="cursor-pointer" src={darkMode?"/DarkAndLight/sum_dark.svg":"/DarkAndLight/sum_light.svg"} width={40} height={40} alt="darkModeIcon" onClick={()=>{changeDarkModeClick(false)}}></Image>
            </div>
        </div>
    )
}
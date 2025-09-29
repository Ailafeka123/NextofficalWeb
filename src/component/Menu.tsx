"use client";
import { useState,useContext } from "react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import menuData from "@/data/menu.json";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import { DarkModeContext } from "@/context/DarkModeContext";

export default function Menu(){
    // 切換語系
    const locale = useLocale();
    const pathName = usePathname();
    // 加載翻譯
    const t = useTranslations("menu");
    // 選單開關
    const [openMenu , setOpenMenu] = useState<boolean>(false);
    const [openMenuItem,setOpenMenuItem] = useState<boolean[]> (Array(menuData.length+1).fill(false));
    const [openMenuItemBG, setOpenMenuItemBg] = useState<boolean>(false);
    const [openMenuColdDown , setOpenMenuColdDown] = useState<boolean>(false);
    // 讀取光暗
    const {darkModeContext} = useContext(DarkModeContext);
    // 選單點擊功能 冷卻500ms
    const clickMenuButton = (status:boolean|null = null) =>{
        if(openMenuColdDown) return ;
        setOpenMenuColdDown(true);
        if(status !== null){
            setOpenMenu(status)
        }else{
            setOpenMenu(!openMenu)
        }
        setTimeout(()=>{
            setOpenMenuColdDown(false);
        },500)

    }
    // 管風琴功能
    const clickMenuItemButton = (isNumber:number|null = null) =>{
        if(isNumber === null){
            setOpenMenuItem(Array(menuData.length+1).fill(false));
            setOpenMenuItemBg(false);
        }else if(openMenuItem[isNumber] === true){
            setOpenMenuItem(Array(menuData.length+1).fill(false));
            setOpenMenuItemBg(false)
        }else{
            const newState: boolean[] = Array(menuData.length+1).fill(false);
            newState[isNumber] = true;
            setOpenMenuItem(newState)
            setOpenMenuItemBg(true);
        }
        
    }
    return (
        <header id="menuHeader" className="flex flex-col md:flex-row gap-[8px] items-center justify-center md:justify-between w-full 
        fixed top-0 left-0 z-999 px-[16px] h-[var(--menuHeight)] border-b-1 bg-[var(--background)]" onMouseLeave={()=>{clickMenuItemButton()}}>
            <div className="z-1000">
                <Link href="/" locale={locale}><Image src={`${darkModeContext?"/selficon/selficon_light.svg":"/selficon/selficon.svg"}`}alt="icon" width={40} height={40}></Image></Link>
            </div>

            <div className="absolute top-0 right-0 p-[8px] z-1000 bg-[var(--background)] hover:bg-[var(--background-2)] m-[8px] cursor-pointer" onClick={()=>{clickMenuButton()}}>
                <div className="md:hidden flex flex-col relative w-[40px] h-[40px]  ">
                    <div className={`w-[40px] border-1 transition-all duration-500 ease-in-out absolute top-1/2 ${openMenu?"-translate-y-[50%] rotate-405":"translate-y-[10px]"}`}></div>
                    <div className={`w-[40px] border-1 transition-all duration-500 ease-in-out absolute top-1/2 ${openMenu?"-translate-y-[50%] -rotate-405":"translate-y-[0]"}`}></div>
                    <div className={`w-[40px] border-1 transition-all duration-500 ease-in-out absolute top-1/2 ${openMenu?"-translate-y-[50%] rotate-405":" -translate-y-[10px]"}`} ></div>
                </div>
            </div>

            <div className={`flex flex-col md:flex-row absolute top-0 left-0 md:relative gap-[8px] bg-[var(--background)] w-full md:w-auto h-svh md:h-auto pt-[var(--menuHeight)] md:p-0 z-999 
                 ${openMenuColdDown?"transition-all duration-500 ease-in-out":""} 
                 ${openMenu?"translate-x-[0] md:translate-x-0":"translate-x-[100vw] md:translate-x-0" }`}>


                <ul className="flex flex-col md:flex-row gap-[8px] text-center items-center">
                    {menuData.map((index,key)=>{
                        if(index.child){
                            const len = index.child.length;
                            const openString:string = `repeat(${len},1fr)`;
                            const colseString:string = `repeat(${len},0fr)`;
                            return(
                                <li key={`${index.label}-${key}`} className="relative w-full md:w-auto flex flex-col items-center justify-center gap-[8px] ">
                                    {openMenuItem[key]?
                                        <Link className="block hover:text-[var(--foreground-2)] hover:bg-[var(--background-2)] p-[8px] rounded-md w-11/12 md:w-auto" onClick={()=>{clickMenuButton(false); clickMenuItemButton()}} href={index.href} locale={locale}>{t(index.label)}</Link>
                                        :<span className="block hover:text-[var(--foreground-2)] hover:bg-[var(--background-2)] p-[8px] rounded-md w-11/12 md:w-auto" onMouseEnter={()=>{clickMenuItemButton(key)}}>{t(index.label)}</span>
                                    }
                                    <ul className={`grid ${openMenuItem[key]? `gap-[8px] md:py-[8px] ` : `` }  overflow-hidden
                                        relative md:absolute left-0 top-0 md:mt-[var(--menuHeight)] bg-[var(--background)]    w-full md:w-[300px] md:text-start
                                        transition-all duration-300 ease-out z-999 border-b md:border-0`} style={{gridTemplateRows: openMenuItem[key]?openString:colseString}}>

                                        {index.child.map((childIndex, childKey)=>{
                                            return(
                                                <li key={`${index.label}-${childIndex.label}-${childKey}`} className={` overflow-hidden   w-full md:w-auto flex flex-col items-center md:items-start justify-center md:justify-start`}>
                                                    <Link className={`hover:text-[var(--foreground-2)] hover:bg-[var(--background-2)] rounded-md w-11/12 md:w-auto ${openMenuItem[key]?"p-[8px]":""}`} href={`${index.href}${childIndex.tag}`} locale={locale} onClick={()=>{clickMenuButton(false); clickMenuItemButton()}}>
                                                        {t(childIndex.label)}
                                                    </Link>
                                                </li>
                                            )
                                        })}

                                    </ul>
                                </li>
                            )
                        }
                        return (
                            <li key={`${index.label}-${key}`} className="relative w-full md:w-auto flex flex-col items-center justify-center gap-[8px] ">
                                <Link  className="block hover:text-[var(--foreground-2)] hover:bg-[var(--background-2)] p-[8px] rounded-md w-11/12 md:w-auto" href={index.href} locale={locale} onClick={()=>{clickMenuButton(false); clickMenuItemButton();}}>{t(index.label)}</Link>
                            </li>
                        )
                    })
                    }
                </ul>

                <div className={`flex flex-col md:flex-row items-center justify-center text-center gap-[8px] px-[8px] w-full md:w-auto
                    transition-all duration-500 ease-in-out overflow-hidden`}>
                    <div className="md:hidden block mb-[8px] hover:bg-[var(--background-2)] cursor-pointer p-[8px] rounded-md w-11/12" onClick={()=>{clickMenuItemButton(5)}} >
                        <p>{t("lang")}</p>
                    </div>

                    <div className={`grid ${openMenuItem[menuData.length]? "grid-rows-[1fr_1fr] gap-[8px]" : "grid-rows-[0fr_0fr]"}  md:grid-rows-1 md:grid-cols-2   md:gap-[8px]  overflow-hidden transition-all duration-300 ease-out w-11/12 md:w-auto `}>
                        <Link href={pathName} locale={"zh"}  className={` overflow-hidden md:p-[8px] rounded-md ${openMenuItem[5]?"p-[8px]":"p-0"} ${locale === "zh" ?"text-[var(--foreground-3)]  cursor-default":"hover:text-[var(--foreground-2)] hover:bg-[var(--background-2)] "}`}>
                            中文
                        </Link>
                        <Link href={pathName} locale={"en"} className={` overflow-hidden md:p-[8px] rounded-md ${openMenuItem[5]?"p-[8px]":"p-0"} ${locale === "en" ?"text-[var(--foreground-3)]  cursor-default":" hover:text-[var(--foreground-2)] hover:bg-[var(--background-2)]"}`}>
                            English
                        </Link>
                    </div>
                </div>

            </div>

            <div className={`hidden md:flex fixed top-[var(--menuHeight)] left-0 w-svw  transition-all duration-300 ease-out ${openMenuItemBG?"h-[250px]":"h-[0]"} bg-[var(--background)] border-b-2 z-998`}></div>
            
        </header>
    )
}
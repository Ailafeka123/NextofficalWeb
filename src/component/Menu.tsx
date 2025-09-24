"use client";
import { useState,useEffect,useContext,useRef } from "react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
export default function Menu(){
    // 切換語系
    const locale = useLocale();
    const pathName = usePathname();
    // 加載翻譯
    const t = useTranslations("menu");
    // 選單開關
    const [openMenu , setOpenMenu] = useState<boolean>(false);
    const [openMenuColdDown , setOpenMenuColdDown] = useState<boolean>(false);
    // const openMenuColdDown = useRef<boolean>(false);
    // 選單點擊功能 冷卻500ms
    const clickMenuButton = () =>{
        if(openMenuColdDown) return ;

        setOpenMenuColdDown(true);
        setOpenMenu(!openMenu)

        setTimeout(()=>{
            setOpenMenuColdDown(false);
        },500)

    }

    return (
        <header className="flex flex-col md:flex-row gap-[8px] items-center justify-center md:justify-between w-full
        fixed top-0 left-0 z-999 px-[16px] h-[var(--menuHeight)] border-b-1 bg-[var(--background)]">
            <div className="z-1000">
                <Link href="/" locale={locale}><Image src="/selficon/selficon_light.svg" alt="icon" width={40} height={40}></Image></Link>
            </div>

            <div className="absolute top-0 right-0 p-[8px] z-1000 bg-[var(--background)] hover:bg-[var(--background-2)] m-[8px]" onClick={()=>{clickMenuButton()}}>
                <div className="md:hidden flex flex-col relative w-[40px] h-[40px]  ">
                    <div className={`w-[40px] border-1 transition-all duration-500 ease-in-out absolute top-1/2 ${openMenu?"-translate-y-[50%] rotate-405":"translate-y-[10px]"}`}></div>
                    <div className={`w-[40px] border-1 transition-all duration-500 ease-in-out absolute top-1/2 ${openMenu?"-translate-y-[50%] -rotate-405":"translate-y-[0]"}`}></div>
                    <div className={`w-[40px] border-1 transition-all duration-500 ease-in-out absolute top-1/2 ${openMenu?"-translate-y-[50%] rotate-405":" -translate-y-[10px]"}`} ></div>
                </div>
            </div>

            <div className={`flex flex-col md:flex-row absolute top-0 left-0 md:relative gap-[16px] bg-[var(--background)] w-full md:w-auto h-svh md:h-auto pt-[var(--menuHeight)] md:p-0 z-999 
                 ${openMenuColdDown?"transition-all duration-500 ease-in-out":""} 
                 ${openMenu?"translate-x-[0] md:translate-x-0":"translate-x-[100vw] md:translate-x-0" }`}>
                <ul className="flex flex-col md:flex-row gap-[8px] text-center items-center">

                    <Link className="hover:text-[var(--foreground-2)] hover:bg-[var(--background-2)] p-[8px] rounded-md w-11/12 md:w-auto" href="/aboutUs" locale={locale}><li >{t("aboutUs")}</li></Link>
                    <Link className="hover:text-[var(--foreground-2)] hover:bg-[var(--background-2)] p-[8px] rounded-md w-11/12 md:w-auto" href="/products" locale={locale}><li>{t("products")}</li></Link>
                    <Link className="hover:text-[var(--foreground-2)] hover:bg-[var(--background-2)] p-[8px] rounded-md w-11/12 md:w-auto" href="/blog" locale={locale}><li>{t("blog")}</li></Link>
                    <Link className="hover:text-[var(--foreground-2)] hover:bg-[var(--background-2)] p-[8px] rounded-md w-11/12 md:w-auto" href="/contact" locale={locale}><li>{t("contact")}</li></Link>

                </ul>
                <div className="grid grid-rows-[1,0] md:grid-rows-1 md:grid-cols-1 text-center gap-[8px] px-[8px] 
                    transition-all duration-500 ease-in-out overflow-hidden
                ">

                    <div className="md:hidden block mb-[8px] hover:bg-[var(--background-2)] cursor-pointer p-[8px] rounded-md ">
                        <p>語系</p>
                    </div>

                    <div className="flex md:flex-row flex-col gap-[8px]  overflow-hidden">
                        <Link href={pathName} locale={"zh"}  className={`${locale === "zh" ?"text-[var(--foreground-3)] p-[8px] rounded-md":"hover:text-[var(--foreground-2)] hover:bg-[var(--background-2)] p-[8px] rounded-md"}`}>
                            中文
                        </Link>
                        <Link href={pathName} locale={"en"} className={`${locale === "en" ?"text-[var(--foreground-3)] p-[8px] rounded-md":" hover:text-[var(--foreground-2)] hover:bg-[var(--background-2)] p-[8px] rounded-md"}`}>
                            English
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
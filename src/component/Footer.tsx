import { useTranslations } from "next-intl";
export default function Footer(){
    const t = useTranslations("footer")
    return(
        <footer className="flex flex-col md:flex-row items-center justify-around gap-[32px] py-[16px] w-full bg-[var(--background-2)] border-t">
            <div className=' flex flex-col gap-2'>
                <p >{t("contact")}</p>
                <p >{t("phone")} : 0917-871-819</p>
                <p >{t("email")} : ailafeka@gmail.com</p>
                <p >{t("contactHours")} : 1000~2000</p>
            </div>
            <div className=" flex flex-col gap-2 items-center text-center px-[16px]">
                <p>{t("content")}</p>
                <p>Copyright© 劉星緯 2025</p>
            </div>
        </footer>
    )
}
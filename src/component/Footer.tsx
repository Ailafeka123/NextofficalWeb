import { useTranslations } from "next-intl";
export default function Footer(){
    const t = useTranslations("footer")
    return(
        <footer className="flex flex-col md:flex-row items-center justify-around gap-[32px] py-[16px] w-full bg-[var(--background-2)] border-t">

            <div className=' md:basis-1/2 flex flex-col gap-2 p-[16px] '>
                <p >{t("contact")}</p>
                <p >{t("phone")} : 0917-871-819</p>
                <p >{t("email")} : ailafeka@gmail.com</p>
                <p >{t("contactHours")} : 1000~2000</p>
            </div>

            <div className=" md:basis-1/2  flex flex-col gap-2 items-center text-center px-[16px]">
                <p>{t("content")}</p>
                <p>Copyright© 劉星緯 2025</p>
                <div className="flex flex-col text-xs">
                    <p>
                        本網站使用 <a href="https://fonts.google.com/icons" target="_black">GoogleIcon</a> 以及 <a href="https://swiperjs.com/" target="_black">Swiper插件</a> 
                    </p>
                    <a href="https://www.flaticon.com/free-icons/facebook" title="facebook icons">Facebook icons created by Freepik - Flaticon</a>
                    <a href="https://www.flaticon.com/free-icons/line" title="line icons">Line icons created by Fathema Khanom - Flaticon</a>
                    <a href="https://www.flaticon.com/free-icons/instagram-logo" title="instagram logo icons">Instagram logo icons created by Laisa Islam Ani - Flaticon</a>
                </div>
            </div>
            
        </footer>
    )
}
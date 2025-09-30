import ContactForm from "@/component/contact/contactForm";
import { useTranslations } from "next-intl";
import Image from "next/image";
export default function contact(){
    const t = useTranslations("contact");
    return (
        <main className="flex flex-col w-full items-center justify-start py-[32px] gap-[32px]">
            <div className="flex flex-col-reverse lg:flex-row items-start justify-start w-full gap-[32px] px-[16px] ">

                <article className="lg:basis-4/12 w-full flex flex-col items-center  gap-[16px]">
                    <h2 className="text-2xl">{t("map")}</h2>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6081.167840182429!2d121.43772772474668!3d25.00405624046243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-TW!2stw!4v1759219587666!5m2!1szh-TW!2stw" className="w-full h-[500px]" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </article>

                <ContactForm/>

            </div>

            <article className=" w-full  flex flex-col items-center justify-start py-[16px] gap-[16px]">
                <h2 className="text-2xl">{t("information")}</h2>
                <section className="flex flex-col md:flex-row w-full items-center justify-around p-[16px] md:p-0 gap-[16px]">

                    <div className="basis-1/2 flex flex-col gap-[16px] items-start md:px-[16px]">
                        <p>{t("contactPosition")}</p>
                        <p>{t("contactPhone")}</p>
                        <p>{t("contactEmail")}</p>
                        <p>{t("contactTime")}</p>
                    </div>

                    <div className="basis-1/2 flex flex-col gap-[16px] items-center justify-center">
                        <h3>{t("contactLinkText")}</h3>
                        <div className="flex flex-row items-center justify-between gap-[8px]">
                            <Image src={"/contact/facebook.png"} width={40} height={40} alt="facebookIcon" className="cursor-pointer hover:-translate-y-[20%] transition-all duration-100 ease-in" ></Image>
                            <Image src={"/contact/line.png"} width={40} height={40} alt="lineIcon" className="cursor-pointer hover:-translate-y-[20%] transition-all duration-100 ease-in"  ></Image>
                            <Image src={"/contact/instagram.png"} width={40} height={40} alt="instagramIcon"  className="cursor-pointer hover:-translate-y-[20%] transition-all duration-100 ease-in" ></Image>
                        </div>
                    </div>
                </section>
            </article>

        </main>
    )
}
import { useTranslations } from "next-intl";
import OurTeam from "@/component/aboutUs/OurTeam";
import HisComponent from "@/component/aboutUs/HisComponent";
export default function AboutUs(){
    const t = useTranslations("aboutus");
    const his :{date:string,description:string}[] = t.raw("history");
    return (
        <main className="flex flex-col items-center justify-start w-full py-[32px] gap-[32px]">

            <article id="brandStory" className="scroll-mt-[var(--menuHeight)] p-[16px] flex flex-col gap-[16px]  w-full items-center ">
                <h2 className="text-3xl text-center">{t("brandStory")}</h2>
                <section className="w-full  lg:w-10/12 lg:min-w-[1024px] flex flex-col gap-[16px]">
                    <p>{t("brandStoryContext1")}</p>
                    <p>{t("brandStoryContext2")}</p>
                </section>
            </article>
            
            <article id="ourTeam" className="scroll-mt-[var(--menuHeight)] py-[16px] w-full flex flex-col items-center gap-[16px]">
                <h2 className="text-3xl">{t("ourTeam")}</h2>
                <OurTeam/>
            </article>

            <article id="milestones" className="scroll-mt-[var(--menuHeight)] py-[16px] flex flex-col items-center gap-[16px] lg:min-w-[1024px]">
                <h2 className="text-3xl">{t("milestones")}</h2>
                <HisComponent/>
            </article>
            
            <article id="coreValues" className="scroll-mt-[var(--menuHeight)] py-[16px] flex flex-col items-center w-full md:w-10/12 lg:min-w-[1024px] gap-[16px] mb-[32px]">
                    <h2 className="text-3xl">{t("coreValues")}</h2>
                    <section className="flex flex-col gap-[16px]">
                        <p>
                            {t("coreValuesContext1")}
                        </p>
                        <p>
                            {t("coreValuesContext2")}
                        </p>
                    </section>
            </article>
        </main>
    )
}
import { useTranslations } from "next-intl";
import ScrollDiv from "@/component/index/ScrollDiv";
import ShowData from "@/component/index/ShowData";
import NewsList from "@/component/index/NewsList";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

async function loadMessages(locale: string) {
  return (await import(`@/data/${locale}/meta.json`)).default;
}

export async function generateMetadata({ params }: Props): Promise<Metadata>{
  const { locale } = await params;
  const messages = await loadMessages(locale);
  return{
    title: messages.index.title,
    openGraph:{
      title:messages.index.title,
    }
  }
}


export default function Home() {
  const t = useTranslations("index");
  const ProductCard = t.raw("productsCards");
  return (
    <main className="flex flex-col items-center justify-start  gap-[16px] mb-[32px]">
      
      <ScrollDiv/>

      <article id="introduction" className="scroll-mt-[var(--menuHeight)] p-[16px] lg:w-min-[1024px] lg:w-10/12  flex flex-col gap-[16px]">
        <h2 className="text-2xl my-[8px]">{t("introduction")}</h2>
        <section className="tracking-widest">
          <p className="tracking-widest ">{t("introductionContext")}</p>
        </section>
        <ShowData/>
      </article>

      <article id="productsList" className="scroll-mt-[var(--menuHeight)] py-[16px] w-full flex flex-col items-center justify-start  lg:w-min-[1024px] lg:w-10/12 px-[16px] lg:p-0">
        <h2 className="text-2xl my-[8px]">{t("productsList")}</h2>
        
        <section className="flex flex-col md:flex-row w-full  items-center justify-between gap-[16px] md:gap-0 p-[8px] md:p-0" >

          {ProductCard.map((index:{imgLink:string,description:string,moreLink:string,moreText:string},key:number)=>{
            return(
                <div key={`card-${key}`} className="relative w-full md:w-3/12 bg-[var(--background-2)] h-[300px] grid grid-rows-1 md:grid-rows-2 p-[8px] gap-[8px] rounded-md">

                  <div className="overflow-hidden  opacity-40 md:opacity-100">
                    <img src={index.imgLink} loading="lazy" className="w-full h-full object-cover"></img>
                  </div>

                  <div className="overflow-hidden absolute md:relative w-full h-full p-[16px] flex flex-col ">
                    <p className="flex-10/12 md:flex-8/12 overflow-hidden text-ellipsis">
                      {index.description}
                    </p>
                    <p className="md:flex-3/12 text-right ">
                      {index.moreText}
                    </p>
                  </div>

                </div>
            )
          })}
        </section>
      </article>

      <article id="news" className=" scroll-mt-[var(--menuHeight)] flex flex-col w-full items-center justify-center lg:w-min-[1024px] lg:w-10/12">
        <h2 className="text-2xl">{t("news")}</h2>
        <NewsList/>
      </article>

    </main>
  );
}

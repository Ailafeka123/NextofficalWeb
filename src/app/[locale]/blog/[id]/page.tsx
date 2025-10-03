
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
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
    title: messages.blog.title,
    openGraph:{
      title:messages.blog.title,
    }
  }
}

import NewsDataShow from "@/component/blogs/NewsDataShow"
export default function Page(){
  const t = useTranslations("menu")
    return(
        <main className="flex flex-col py-[32px] items-center justify-start">
            <div className="w-full px-[16px]">
                <h2 className="text-xl">
                  <Link href={"/"}><span className="hover:underline" >{t("index")}</span></Link>  
                  <span> / </span> 
                  <Link href={"/blog"}><span className="hover:underline">{t("blog")}</span></Link>
                </h2>
            </div>
            <NewsDataShow/>
        </main>
    )
}

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
    title: messages.blog.title,
    openGraph:{
      title:messages.blog.title,
    }
  }
}

import NewsDataShow from "@/component/blogs/NewsDataShow"
export default function Page(){
    return(
        <main className="flex flex-col py-[32px] items-center justify-start">
            <NewsDataShow/>
        </main>
    )
}
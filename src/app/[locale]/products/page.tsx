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
    title: messages.products.title,
    openGraph:{
      title:messages.products.title,
    }
  }
}


export default function Products(){
    return (
        <main className="flex flex-col items-center justify-start py-[32px]">
            <div className="w-full">
                <h2>路徑:</h2>
            </div>
            <article>
                <h2 className="text-2xl">這裡是作品頁面</h2>
            </article>
        </main>
    )
}
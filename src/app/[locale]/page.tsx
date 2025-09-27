import { useTranslations } from "next-intl";
import ScrollDiv from "@/component/index/ScrollDiv";
export default function Home() {
  const t = useTranslations("index");
  return (
    <main className="flex flex-col items-center justify-start  gap-[16px] mb-[32px]">
      
      <ScrollDiv/>

      <article id="introduction" className="scroll-mt-[var(--menuHeight)] p-[16px] lg:w-min-[1024px] lg:w-10/12">
        <h2 className="text-2xl my-[8px]">{t("introduction")}</h2>
        <section className="tracking-widest">
          <p className="tracking-widest ">Lorem Ipsum，也称乱数假文或者哑元文本， 是印刷及排版领域所常用的虚拟文字。由于曾经一台匿名的打印机刻意打乱了一盒印刷字体从而造出一本字体样品书，Lorem Ipsum从西元15世纪起就被作为此领域的标准文本使用。它不仅延续了五个世纪，还通过了电子排版的挑战，其雏形却依然保存至今。在1960年代，”Leatraset”公司发布了印刷着Lorem Ipsum段落的纸张，从而广泛普及了它的使用。最近，计算机桌面出版软件”Aldus PageMaker”也通过同样的方式使Lorem Ipsum落入大众的视野。</p>
        </section>
      </article>

      <article id="productsList" className="scroll-mt-[var(--menuHeight)] py-[16px] w-full flex flex-col items-center justify-start  lg:w-min-[1024px] lg:w-10/12 ">
        <h2 className="text-2xl my-[8px]">{t("productsList")}</h2>
        <section className="flex flex-col md:flex-row w-full md:w-10/12 items-center justify-between gap-[16px] md:gap-0" >

          <div className="relative w-full md:w-3/12 bg-[var(--background-2)] h-[300px] grid grid-rows-1 md:grid-rows-2 p-[8px] gap-[8px] rounded-md">

            <div className="overflow-hidden  opacity-40 md:opacity-100">
              <img src="https://picsum.photos/300/200?id=5" loading="lazy" className="w-full h-full object-cover"></img>
            </div>

            <div className="overflow-hidden absolute md:relative w-full h-full p-[16px] flex flex-col ">
              <p className="flex-10/12 md:flex-8/12 overflow-hidden text-ellipsis">
                假文或者哑元文本， 是印刷及排版领域所常用的虚拟文字。由于曾经一台匿名的打印机刻意打乱了
              </p>
              <p className="md:flex-3/12 text-right ">
                了解更多
              </p>
            </div>

          </div>

          <div className="relative w-full md:w-3/12 bg-[var(--background-2)] h-[300px] grid grid-rows-1 md:grid-rows-2 p-[8px] gap-[8px] rounded-md">

            <div className="overflow-hidden  opacity-40 md:opacity-100">
              <img src="https://picsum.photos/300/200?id=6" loading="lazy" className="w-full h-full object-cover"></img>
            </div>

            <div className="overflow-hidden absolute md:relative w-full h-full p-[16px] flex flex-col ">
              <p className="flex-10/12 md:flex-8/12 overflow-hidden text-ellipsis">
                桌面出版软件”Aldus PageMaker”也通过同样的方式使Lorem Ip
              </p>
              <p className="md:flex-3/12 text-right ">
                了解更多
              </p>
            </div>
            
          </div>

          <div className="relative w-full md:w-3/12 bg-[var(--background-2)] h-[300px] grid grid-rows-1 md:grid-rows-2 p-[8px] gap-[8px] rounded-md">

            <div className="overflow-hidden  opacity-40 md:opacity-100">
              <img src="https://picsum.photos/300/200?id=7" loading="lazy" className="w-full h-full object-cover"></img>
            </div>

            <div className="overflow-hidden absolute md:relative w-full h-full p-[16px] flex flex-col ">
              <p className="flex-10/12 md:flex-8/12 overflow-hidden text-ellipsis">
                版领域所常用的虚拟文字。由于曾经一台匿名的打印机刻意打乱了一盒印刷字体从而造出一本字体样品书，Lorem Ipsum从西元15世纪起就被作为此领域的标准文本使用。它不仅延续了五个世纪，还通过了电子排版的挑战，其雏形却依然保存至今。在1960年代，”Leatraset”公
              </p>
              <p className="md:flex-3/12 text-right ">
                了解更多
              </p>
            </div>
            
          </div>

        </section>
      </article>

      <article id="news" className=" scroll-mt-[var(--menuHeight)] md:p-[16px] flex flex-col w-full items-center justify-center lg:w-min-[1024px] lg:w-10/12">
        <h2 className="text-2xl">{t("news")}</h2>
        <div className="w-full  h-svh  m-[16px] bg-[var(--background-2)]">
        </div>
      </article>
    </main>
  );
}

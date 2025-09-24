import type { Metadata,Viewport } from "next";

export const metadata: Metadata = {
  title: "Aila-訪官方網站 ",
  description: "使用Next製作的訪官方網站作品",
  keywords:["劉星緯","官方網站","Next","i18n"],
  icons:{
    icon:[
      {url:`/selficon/selficon.svg`,media: "(prefers-color-scheme: light)", type:`image/svg+xml`},
      {url:`/selficon/selficon_light.svg`,media: "(prefers-color-scheme: dark)", type:`image/svg+xml`}
    ],
  },
  authors:[{name:"劉星緯"}],
  creator:"劉星緯",
  openGraph:{
    title:"Aila-訪官方網站",
    description:"使用Next製作的訪官方網站作品",
    locale:"zh",
    type:"website",
  },
};

export const viewport : Viewport = {
  width:"device-width",
  initialScale:1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
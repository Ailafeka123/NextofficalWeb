"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import AlterComponent from "../AlterComponent";
import { Tilt_Neon } from "next/font/google";

type messageData = {
    name:string,
    email:string,
    phone:string,
    title:string,
    context:string
}

export default function ContactForm(){
    const t = useTranslations("contact");
    const [inputState , setInputState] = useState<boolean[]> (Array(4).fill(false));
    const [formMessage, setFormMessage] = useState<messageData> ({name:"",email:"",phone:"",title:"",context:""})
    // const formMessage  = useRef<messageData>({name:"",email:"",phone:"",title:"",context:""});
    const [errorMessage , setErrorMessage] = useState<string>("");
    const [alterState,setAlterSatate] = useState<boolean>(false);
    // 修改內容
    const changeValueFunction = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        let  value =e.target.value;
        const item = e.target.id;
        if(item === "phone"){
            value =  value.replace(/[^0-9+]/g,"");
        }else if(item === "email"){
            value =  value.replace(/[^0-9a-zA-Z@.+]/g,"");
        }else{
            let temp = value.replace(" ","");
            temp = temp.replace("　","");
            if(temp === ""){
                value = "";
            }
        }

        setFormMessage(prev=>(
            {
                ...prev,
                [item]:value
            }
        )
        )
    }
    // focus時 解除限制
    const focusInput = (inputNumber:number) =>{
        setInputState(index=>{
            const temp = [...index];
            temp[inputNumber] = true;
            return temp;
        })
    }
    
    const blurInput = (id:"name"|"email"|"phone"|"title"|"context",inputNumber:number) =>{
        if(formMessage[id] === ""){
            setInputState(index=>{
                const temp = [...index];
                temp[inputNumber] = false;
                return temp;
            })
        }
    }

    // 
    const subMessage = () =>{
        // 分別進行檢查
        const {name, email, phone, title, context} = formMessage;
        if(name ===  "" || email === "" || phone === "" || title === "" || context === ""){
            setErrorMessage("error1")
            return;
        }


        setFormMessage({name:"",email:"",phone:"",title:"",context:""});
        setErrorMessage("");
        setAlterSatate(true);
        
    }

    return(
        <article className="w-full  flex flex-col items-center justify-start gap-[16px] md:basis-8/12 ">

            <h2 className="text-2xl">{t("contactUs")}</h2>

            <section className="bg-[var(--background-2)] w-full  flex flex-col items-center justify-around gap-[16px] p-[16px] rounded-md ">

                <div className=" flex flex-col lg:flex-row items-center  justify-center gap-[16px] lg:gap-[8px] w-full " >

                    <div className="relative lg:basis-1/2 flex flex-row items-end sm:items-center justify-end sm:justify-center w-full h-[80px] sm:h-auto">

                        <label htmlFor="name"  className={`absolute left-[8px]  top-[50%] transition-all sm:transition-none duration-500 ease-out ${inputState[0]?" -translate-y-[40px] sm:translate-y-0":"  sm:translate-y-0"}  sm:relative sm:basis-1/6 lg:basis-1/3 text-center`} >{t("name")}:</label>
                        <input id="name" type="text" className=" w-full sm:basis-5/6 lg:basis-2/3 bg-[var(--background)] border-1 rounded-md p-[8px] h-[50px]" onFocus={()=>{focusInput(0);}} value={formMessage.name} onChange={(e)=>{changeValueFunction(e)}} onBlur={(e)=>{blurInput("name",0)}} required></input>

                    </div>

                    <div className="relative lg:basis-1/2 flex flex-row items-end sm:items-center justify-end sm:justify-center w-full h-[80px] sm:h-auto">

                        <label htmlFor="email" className={`absolute left-[8px]  top-[50%] transition-all sm:transition-none duration-500 ease-out ${inputState[1]?" -translate-y-[40px] sm:translate-y-0":"  sm:translate-y-0"}  sm:relative sm:basis-1/6 lg:basis-1/3 text-center`} >{t("email")}:</label>
                        <input id="email" type="email" className=" w-full sm:basis-5/6 lg:basis-2/3 bg-[var(--background)] border-1 rounded-md p-[8px] h-[50px]" onFocus={()=>{focusInput(1);}} value={formMessage.email} onChange={(e)=>{changeValueFunction(e)}} onBlur={(e)=>{blurInput("email",1)}} required></input>

                    </div>
                </div>

                <div className="flex flex-row items-end sm:items-center justify-center w-full relative h-[80px] sm:h-auto">

                    <label htmlFor="phone" className={`absolute left-[8px]  top-[50%] transition-all sm:transition-none duration-500 ease-out ${inputState[2]?" -translate-y-[40px] sm:translate-y-0":"  sm:translate-y-0"}  sm:relative sm:basis-1/6 text-center`}>{t("phone")}:</label>
                    <input id="phone" pattern="[0-9]" maxLength={10} type="string" className="w-full sm:basis-5/6 bg-[var(--background)] border-1 rounded-md p-[8px] h-[50px]" onFocus={()=>{focusInput(2);}} value={formMessage.phone} onChange={(e)=>{changeValueFunction(e)}} onBlur={(e)=>{blurInput("phone",2)}} required></input>

                </div>

                <div className="flex flex-row items-end sm:items-center justify-center w-full relative h-[80px] sm:h-auto">

                    <label htmlFor="title" className={`absolute left-[8px]  top-[50%] transition-all sm:transition-none duration-500 ease-out ${inputState[3]?" -translate-y-[40px] sm:translate-y-0":"  sm:translate-y-0"}  sm:relative sm:basis-1/6 text-center`}>{t("title")}:</label>
                    <input id="title" type="text" className="w-full sm:basis-5/6 bg-[var(--background)] border-1 rounded-md p-[8px] h-[50px]" onFocus={()=>{focusInput(3);}} value={formMessage.title} onChange={(e)=>{changeValueFunction(e)}} onBlur={(e)=>{blurInput("title",3)}} required></input>

                </div>

                <div className="flex flex-col items-start justify-center w-full relative gap-[16px]">
                    <label htmlFor="context" className=" " >{t("context")}:</label>
                    <textarea name="context" id="context" className="w-full  h-[300px] border-1 bg-[var(--background)] p-[16px] rounded-md overflow-y-scroll" value={formMessage.context} onChange={(e)=>{changeValueFunction(e)}} required></textarea>
                </div>

                <div className="w-full text-center ">
                    <p className="text-red-500 ">{errorMessage?t(errorMessage):""}</p>
                </div>

                <button type="button" className="border-1 p-[8px] rounded-md bg-[var(--background)] hover:bg-[var(--background-2)] active:bg-[var(--background-3)] cursor-pointer" onClick={()=>{subMessage()}}>{t("sub")}</button>

            </section>
            <AlterComponent showState={alterState} onShowState={setAlterSatate} inputString="感謝您的使用"/>
        </article>
    )
}
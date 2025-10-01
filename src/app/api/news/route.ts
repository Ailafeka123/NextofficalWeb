import { NextResponse } from "next/server";
import zhData from "@/data/zh/news.json";
import enData from "@/data/en/news.json";

export async function GET(req: Request){
    
    const url = new URL(req.url);
    const local = url.searchParams.get('local');
    
    if(local ==="zh"){
        const temp = zhData.map(index=>{
            return{
                id:index.id,
                title:index.title,
                date:index.date
            }
        })
        return NextResponse.json(temp);
    }else if(local === "en"){
        const temp = enData.map(index=>{
            return{
                id:index.id,
                title:index.title,
                date:index.date
            }
        })
        return NextResponse.json(temp);
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });

    
}
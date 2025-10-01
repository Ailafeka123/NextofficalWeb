import { NextResponse } from "next/server";

import zhData from "@/data/zh/news.json";
import enData from "@/data/en/news.json";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }){
    const url = new URL(req.url);
    const local = url.searchParams.get('local');
    const { id } = await context.params;
    let user;
    if(local ==="zh"){
        user = zhData.find(u => u.id === id );
        return NextResponse.json(user)
        
    }else if(local === "en"){
        user = enData.find(u => u.id === id );
        return NextResponse.json(user)
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });



}
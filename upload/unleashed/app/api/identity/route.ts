import {NextRequest,NextResponse} from "next/server";
import {getVisitor} from "@/lib/visitor";
export function GET(r:NextRequest){try{const v=getVisitor(r);return NextResponse.json({id:v.id,name:v.name})}catch{return NextResponse.json({id:null,name:"Visitor"})}}

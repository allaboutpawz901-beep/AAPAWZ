import { NextRequest, NextResponse } from "next/server";
import { getVisitor } from "@/lib/visitor";
import {
  listWorkspaceNotes, saveWorkspaceNote, deleteWorkspaceNote,
  listWorkspaceEvents, saveWorkspaceEvent, deleteWorkspaceEvent,
  listWorkspaceFiles, saveWorkspaceFile, deleteWorkspaceFile,
  listAssignmentStates, saveAssignmentState,
  listWorkspaceMessages, saveWorkspaceMessage, listLearningEvidence, saveLearningEvidence, workspaceSummary,
} from "@/lib/db";

export const runtime="nodejs";
export const dynamic="force-dynamic";

function snapshot(ownerId:string){
  return {
    notes:listWorkspaceNotes(ownerId), events:listWorkspaceEvents(ownerId),
    files:listWorkspaceFiles(ownerId), assignments:listAssignmentStates(ownerId),
    messages:listWorkspaceMessages(ownerId), evidence:listLearningEvidence(ownerId), summary:workspaceSummary(ownerId),
  };
}
export async function GET(request:NextRequest){
  try { const v=getVisitor(request); return NextResponse.json(snapshot(v.id)); }
  catch(e){ return NextResponse.json({error:e instanceof Error?e.message:"Unauthorized"},{status:401}); }
}
export async function POST(request:NextRequest){
  try{
    const v=getVisitor(request);
    const type=request.headers.get("content-type")||"";
    if(type.includes("multipart/form-data")){
      const form=await request.formData(); const file=form.get("file");
      if(!(file instanceof File)) return NextResponse.json({error:"Choose a file."},{status:400});
      if(file.size>10_000_000) return NextResponse.json({error:"Files must be under 10 MB."},{status:400});
      saveWorkspaceFile(v.id,{courseId:Number(form.get("courseId"))||null,name:file.name,mime:file.type||"application/octet-stream",data:new Uint8Array(await file.arrayBuffer())});
      return NextResponse.json(snapshot(v.id));
    }
    const body=await request.json() as any;
    if(body.action==="save-note") saveWorkspaceNote(v.id,body);
    else if(body.action==="delete-note") deleteWorkspaceNote(v.id,Number(body.id));
    else if(body.action==="save-event") saveWorkspaceEvent(v.id,body);
    else if(body.action==="delete-event") deleteWorkspaceEvent(v.id,Number(body.id));
    else if(body.action==="delete-file") deleteWorkspaceFile(v.id,Number(body.id));
    else if(body.action==="assignment") saveAssignmentState(v.id,body);
    else if(body.action==="message") saveWorkspaceMessage(v.id,{sender:v.name,recipient:body.recipient||"Instructor",content:String(body.content||"").slice(0,4000)});
    else if(body.action==="evidence") saveLearningEvidence(v.id,{courseId:Number(body.courseId),kind:String(body.kind||"Professor exchange"),title:String(body.title||"Learning evidence").slice(0,200),content:String(body.content||"").slice(0,12000)});
    else return NextResponse.json({error:"Unknown workspace action."},{status:400});
    return NextResponse.json(snapshot(v.id));
  }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Workspace action failed."},{status:500});}
}

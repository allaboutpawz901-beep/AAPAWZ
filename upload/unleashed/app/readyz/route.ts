import {DatabaseSync} from "node:sqlite";
export const dynamic="force-dynamic";
export function GET(){try{const d=new DatabaseSync(process.env.UNLEASHED_DB_PATH||"data/unleashed.db",{readOnly:true});d.prepare("SELECT COUNT(1) FROM courses").get();d.close();return new Response(null,{status:204})}catch{return new Response(null,{status:503})}}

import type {Metadata} from "next";
import "./globals.css";
export const metadata:Metadata={title:"UNLEASHED · The Classroom",description:"One school day. One classroom. Led by Professor."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
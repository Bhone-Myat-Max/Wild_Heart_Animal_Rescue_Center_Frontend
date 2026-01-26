import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar";


export default async function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
         <SidebarProvider>
            <AppSidebar />
            {children}
        </SidebarProvider>
    );
}

import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Sidebar from "@/components/sidebar";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Header from "@/components/dashboard_header";

export default async function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/")
    }
    // useEffect(() => {
    //     if (!session) {
    //         signOut();
    //     }
    // }, [session]);
    // setLoading(true)
    // if (product?.id){
    //     await updateProduct(product?.id!, data)
    // }else{
    //     await createProduct(data)
    // }
    // setLoading(false);
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header/>
                <main className="flex-1 p-6">{children}</main>
            </div>
            
        </div>

    );
}
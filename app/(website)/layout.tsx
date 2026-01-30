import Footer from "@/components/footer";
import Navbar from "@/components/nav-bar";

export default async function WebsiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
           <div className="">
            <Navbar/>
                <main>
                    {children}
                </main>
            <Footer/>
           </div>
    );
}

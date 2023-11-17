import Header from "@/components/common/Header";
import { SideBar } from "@/components/common/SideBar";
import { SidebarProvider } from "@/context/SidebarContext";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);
  if(!session){
    redirect('/')
  }
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <Header/>
        <div className="bg-stone-100 h-screen grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <SideBar />
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

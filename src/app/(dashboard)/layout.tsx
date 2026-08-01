import SideBar from "@/components/SideBar";
import "../globals.css";
import { auth } from "@/auth";

export default async function DashboardLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
      const session = await auth();
      console.log(session?.user.role);
return (
    <div className="h-screen flex">
    {/*LEFT*/}
    <div className="w-2/6 md:w-[8%] lg:w-[16%] xl:w-[14%]  ">
<SideBar role={session?.user.role} />
    </div>

    {/*RIGHT*/}
    <div className="w-4/6 md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll  flex flex-col">
        {children}
    </div>
    </div>
);
}

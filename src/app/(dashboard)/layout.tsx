import SideBar from "@/components/SideBar";
import "../globals.css";

export default function DashboardLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
    <div className="h-screen flex">
    {/*LEFT*/}
    <div className="w-2/6 md:w-[8%] lg:w-[16%] xl:w-[14%]  ">
<SideBar />
    </div>

    {/*RIGHT*/}
    <div className="w-4/6 md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll  flex flex-col">
        {children}
    </div>
    </div>
);
}

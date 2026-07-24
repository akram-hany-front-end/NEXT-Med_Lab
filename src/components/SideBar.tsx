import { Role, Roles } from "@/lib/roles";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    logo: "/logo.png",
    title: "MedLab Central",
    items: [
      {
        icon: "/dashboard.png",
        label: "Dashboard",
        href: "/dashboard",
        visible: [Roles.ADMIN],
      },
      {
        icon: "/useronly.png",
        label: "Patients",
        href: "/admin/patients",
        visible: [Roles.ADMIN],
      },
      {
        icon: "/useronly.png",
        label: "Employees",
        href: "/admin/employees",
        visible: [Roles.ADMIN],
      },
      {
        icon: "/user.png",
        label: "Patient Search",
        href: "/admin/patientsearch",
        visible: [Roles.ADMIN, Roles.EMPLOYEE],
      },
      {
        icon: "/lab.png",
        label: "Lab Results",
        href: "/admin/results",
        visible: [Roles.ADMIN, Roles.EMPLOYEE, Roles.PATIENT],
      },
      {
        icon: "/inventory.png",
        label: "Appointments",
        href: "/admin/appointments",
        visible: [ Roles.EMPLOYEE, Roles.PATIENT, Roles.ADMIN],
      },
    ],
  },
];

const SideBar = () => {
  const currentRole: Role = Roles.ADMIN; // For Test Only
  return (
    <div className=" text-sm bg-blue-600 h-full p-4 w-full">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <Link href="/">
            <div className="flex flex-row gap-2 justify-center items-center">
              <div className="">
                <Image src={i.logo} alt="Logo" width={45} height={40} />
              </div>
              <span className="hidden lg:block text-white font-bold my-4 text-2xl">
                {i.title}
              </span>
            </div>
          </Link>

          {i.items.map((item) => {
            if (item.visible.includes(currentRole)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-white/70 py-2 rounded-md md:px-2 hover:bg-blue-500 transition"
                >
                  <Image
                    width={16}
                    height={16}
                    alt={item.label}
                    src={item.icon}
                  />
                  <span className="hidden lg:block text-xl font-semibold ">
                    {item.label}
                  </span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default SideBar;

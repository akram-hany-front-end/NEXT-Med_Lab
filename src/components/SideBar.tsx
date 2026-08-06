"use client";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserRound,
  FileText,
  Clock3,
  CircleUserRound,
  LogOut,
  TestTube,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Role, Roles } from "@/lib/roles";
import Image from "next/image";
import Link from "next/link";

export const adminLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    href: "/admin/appointments",
    icon: CalendarDays,
  },
  {
    title: "Employees",
    href: "/admin/employees",
    icon: Users,
  },
  {
    title: "Patients",
    href: "/admin/patients",
    icon: UserRound,
  },
  {
    title: "Results",
    href: "/admin/results",
    icon: FileText,
  },
  {
    title: "Work Schedule",
    href: "/admin/workschedule",
    icon: Clock3,
  },
  {
    title: "Tests",
    href: "/admin/tests",
    icon: TestTube,
  },
  {
    title: "Profile",
    href: "/admin/profile",
    icon: CircleUserRound,
  },
];
export const employeeLinks = [
  {
    title: "Dashboard",
    href: "/employee",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    href: "/employee/appointments",
    icon: CalendarDays,
  },
  {
    title: "Patients",
    href: "/employee/patients",
    icon: UserRound,
  },
  {
    title: "Results",
    href: "/employee/results",
    icon: FileText,
  },
  {
    title: "Profile",
    href: "/employee/profile",
    icon: CircleUserRound,
  },
];
export const patientLinks = [
  {
    title: "Dashboard",
    href: "/patient",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    href: "/patient/appointments",
    icon: CalendarDays,
  },
  {
    title: "Results",
    href: "/patient/results",
    icon: FileText,
  },
  {
    title: "Profile",
    href: "/patient/profile",
    icon: CircleUserRound,
  },
];

type SideBarProps = {
  role?: string;
};

const SideBar = ({ role }: SideBarProps) => {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/sign-in",
    });
  };
    console.log(role);

  const menuItems =
    role === Roles.ADMIN
      ? adminLinks
      : role === Roles.EMPLOYEE
      ? employeeLinks
      : patientLinks;

  return (
    <div className="bg-blue-600 h-full p-4">
      <Link href="/" className="flex items-center gap-3 mb-8">
        <Image src="/logo.png" alt="Logo" width={45} height={45} />

        <span className="hidden lg:block text-2xl font-bold text-white">
          MedLab Pro
        </span>
      </Link>

      <div className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-4 rounded-lg px-3 py-3 text-white/80 hover:bg-blue-500 hover:text-white transition"
            >
              <Icon size={20} />

              <span className="hidden lg:block font-medium">{item.title}</span>
            </Link>
          );
        })}
      </div>
     <button
  onClick={handleLogout}
  type="button"
  className="mt-6 flex w-full items-center gap-4 rounded-lg px-3 py-3 text-white/80 hover:bg-red-500 hover:text-white transition"
>
  <LogOut size={20} />

  <span className="hidden lg:block font-medium">
    Sign Out
  </span>
</button>
    </div>
  );
};

export default SideBar
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function EmployeeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/sign-in");
    }

    if (session.user.role !== "Employee") {
        redirect("/");
    }

    return <>{children}</>;
}
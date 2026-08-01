import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.role !== "Patient") {
    redirect("/");
  }

  return <>{children}</>;
}
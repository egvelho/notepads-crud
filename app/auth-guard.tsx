import { redirect } from "next/navigation";
import { getSession } from "./auth";

export async function AuthGuard({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return <>{children}</>;
}

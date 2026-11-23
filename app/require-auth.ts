import { redirect } from "next/navigation";
import { getSession } from "./auth";

export async function requireAuth() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

import { getSession } from "./auth";
import { redirect } from "next/navigation";

type AuthCheckerProps = {
  children: React.ReactNode;
};

export async function AuthChecker({ children }: AuthCheckerProps) {
  const session = await getSession();

  if (session === null) {
    redirect("/login");
  }

  return <>{children}</>;
}

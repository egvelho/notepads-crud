import { Suspense } from "react";
import { AuthGuard } from "@/app/auth-guard";
import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteSession } from "@/app/auth";
import type { Metadata } from "next";

export const instant = false;

export const metadata: Metadata = {
  title: "CRUD de anotações",
  description: "O melhor app de anotações que nem o Elon Musk consegue fazer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  async function logoutAction() {
    "use server";

    await deleteSession();
    redirect("/login");
  }

  return (
    <AuthGuard>
      <header className="bg-pink-600 p-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4 text-2xl font-bold">
          <img className="w-16" src="/notepad.png" alt="" />
          anotações.txt
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/criar-anotacao"
            className="bg-green-800 p-4 text-xl font-bold uppercase rounded-xl hover:bg-yellow-800"
          >
            Criar anotação
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="bg-red-800 p-4 text-xl font-bold uppercase rounded-xl hover:bg-red-900 cursor-pointer"
            >
              Sair
            </button>
          </form>
        </div>
      </header>
      {children}
    </AuthGuard>
  );
}

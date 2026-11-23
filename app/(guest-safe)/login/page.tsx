// app/login/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/app/auth";

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  async function loginAction(formData: FormData) {
    "use server";

    const username = formData.get("username")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (!username || !password) {
      redirect("/login?error=Preencha+usuário+e+senha");
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      redirect("/login?error=Usuário+ou+senha+inválidos");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      redirect("/login?error=Usuário+ou+senha+inválidos");
    }

    await createSession({
      id: user.id,
      username: user.username,
    });

    redirect("/criar-anotacao");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-zinc-900">Entrar</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Acesse sua conta para gerenciar suas anotações.
          </p>
        </div>

        <form action={loginAction} className="space-y-4">
          <Suspense fallback={null}>
            <ErrorMessage searchParams={searchParams} />
          </Suspense>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-zinc-700"
            >
              Usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              placeholder="seu_usuario"
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••"
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-600">
          Não tem uma conta?{" "}
          <Link
            href="/register"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  );
}

async function ErrorMessage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  if (!error) return null;

  return (
    <div
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
    >
      {error}
    </div>
  );
}

// app/register/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/app/auth";

interface RegisterPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default function RegisterPage({ searchParams }: RegisterPageProps) {
  async function registerAction(formData: FormData) {
    "use server";

    const username = formData.get("username")?.toString().trim();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    if (!username || !password || !confirmPassword) {
      redirect("/register?error=Preencha+todos+os+campos");
    }

    if (username.length < 3) {
      redirect("/register?error=O+usuário+precisa+ter+pelo+menos+3+caracteres");
    }

    if (password.length < 6) {
      redirect("/register?error=A+senha+precisa+ter+pelo+menos+6+caracteres");
    }

    if (password !== confirmPassword) {
      redirect("/register?error=As+senhas+não+coincidem");
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      redirect("/register?error=Este+nome+de+usuário+já+está+em+uso");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // Já autentica o usuário recém-criado
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
          <h1 className="text-xl font-semibold text-zinc-900">Criar conta</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Cadastre-se para começar a salvar suas anotações.
          </p>
        </div>

        <form action={registerAction} className="space-y-4">
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
              minLength={3}
              autoComplete="username"
              placeholder="escolha_um_usuario"
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
              minLength={6}
              autoComplete="new-password"
              placeholder="••••••"
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-zinc-700"
            >
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="••••••"
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Criar conta
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-600">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline"
          >
            Entrar
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

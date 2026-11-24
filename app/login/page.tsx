"use client";

import { useState } from "react";
import { login } from "../auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event: any) {
    event.preventDefault();
    const response = await login(username, password);

    if (response.success) {
      toast.success(response.message);
      router.push("/");
    } else {
      toast.error(response.message);
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="border-2 p-4 rounded-xl border-gray-400">
        <form className="flex flex-col gap-4 max-w-78 p-4" onSubmit={onSubmit}>
          <h1 className="text-center font-bold text-xl">Entrar na sua conta</h1>
          <input
            className="border-gray-400 border-2 p-2 rounded-lg text-black"
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            className="border-gray-400 border-2 p-2 rounded-lg text-black"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            className="border-gray-400 border-2 p-2 rounded-lg hover:cursor-pointer hover:bg-cyan-900"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

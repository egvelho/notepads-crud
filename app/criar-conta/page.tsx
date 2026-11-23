"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { createUser } from "../auth";
import { create } from "domain";

export default function CreateAccountPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function onSubmit(event: any) {
    event.preventDefault();

    if (username.trim() === "") {
      toast.error("O nome de usuário não pode ficar vazio.");
      return;
    }

    if (password.trim() === "") {
      toast.error("A senha não pode ficar vazia.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas são diferentes. Vou sequestrar teu pet.");
      return;
    }

    const response = await createUser(username, password);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="border-2 p-4 rounded-xl border-gray-400">
        <form className="flex flex-col gap-4 max-w-78 p-4" onSubmit={onSubmit}>
          <h1 className="text-center font-bold text-xl">Criar sua conta</h1>
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
          <input
            className="border-gray-400 border-2 p-2 rounded-lg text-black"
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
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

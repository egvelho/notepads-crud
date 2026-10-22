"use client";
import { useState } from "react";
import { createNotepad } from "./notepad-crud";

export function CreateNotepadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function onSubmitNotepad(event) {
    event.preventDefault();
    const mensagem = await createNotepad(title, description);
    alert(mensagem);
  }

  return (
    <form
      onSubmit={onSubmitNotepad}
      className="flex flex-col gap-4 max-w-78 p-4"
    >
      <h1 className="text-center font-bold text-xl">Criar anotação</h1>
      <input
        className="border-gray-400 border-2 p-2 rounded-lg"
        type="text"
        placeholder="Título"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <textarea
        className="border-gray-400 border-2 p-2 rounded-lg"
        placeholder="Descrição"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      ></textarea>
      <button
        className="border-gray-400 border-2 p-2 rounded-lg hover:cursor-pointer hover:bg-cyan-900"
        type="submit"
      >
        Enviar
      </button>
    </form>
  );
}

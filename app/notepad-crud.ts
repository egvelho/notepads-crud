"use server";

import { prisma } from "@/lib/prisma";

// Lista todas as anotações
export async function listNotepads() {
  return prisma.notepad.findMany();
}

// Devolve uma anotação pelo id
export async function getNotepad() {
  console.log("pega anotação");
}

// Cria uma nova anotação
export async function createNotepad(title: string, description: string) {
  if (title.length < 4) {
    return "O título precisa ter pelo menos 4 caracteres.";
  } else if (title.length > 64) {
    return "O título só pode ter até 64 caracteres.";
  } else if (description.length < 8) {
    return "A descrição precisa ter pelo menos 8 caracteres.";
  } else if (description.length > 256) {
    return "A descrição só pode ter até 256 caracteres.";
  }

  await prisma.notepad.create({
    data: {
      title,
      description,
    },
  });

  return "Anotação criada com sucesso!";
}

// Edita uma anotação pelo id
export async function editNotepad() {
  console.log("edita anotação");
}

// Deleta uma anotação pelo id
export async function deleteNotepad() {
  console.log("deleta anotação");
}

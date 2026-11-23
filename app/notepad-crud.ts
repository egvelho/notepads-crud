"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "./require-auth";

// Lista apenas as anotações do usuário logado
export async function listNotepads() {
  const { user } = await requireAuth();

  return prisma.notepad.findMany({
    where: {
      userId: user.id,
    },
  });
}

// Devolve uma anotação pelo id SOMENTE se pertencer ao usuário logado
export async function getNotepadById(id: number) {
  const { user } = await requireAuth();

  const notepad = await prisma.notepad.findFirstOrThrow({
    where: {
      id,
      userId: user.id,
    },
  });

  return notepad;
}

// Cria uma nova anotação vinculada ao usuário logado
export async function createNotepad(title: string, description: string) {
  const { user } = await requireAuth();

  if (title.length < 4) {
    return {
      sucesso: false,
      mensagem: "O título precisa ter pelo menos 4 caracteres.",
    };
  } else if (title.length > 64) {
    return {
      sucesso: false,
      mensagem: "O título só pode ter até 64 caracteres.",
    };
  } else if (description.length < 8) {
    return {
      sucesso: false,
      mensagem: "A descrição precisa ter pelo menos 8 caracteres.",
    };
  } else if (description.length > 256) {
    return {
      sucesso: false,
      mensagem: "A descrição só pode ter até 256 caracteres.",
    };
  }

  await prisma.notepad.create({
    data: {
      title,
      description,
      userId: user.id,
    },
  });

  return {
    sucesso: true,
    mensagem: "Anotação criada com sucesso!",
  };
}

// Edita uma anotação pelo id SOMENTE se pertencer ao usuário logado
export async function editNotepad(
  id: number,
  title: string,
  description: string,
) {
  const { user } = await requireAuth();

  if (title.length < 4) {
    return {
      sucesso: false,
      mensagem: "O título precisa ter pelo menos 4 caracteres.",
    };
  } else if (title.length > 64) {
    return {
      sucesso: false,
      mensagem: "O título só pode ter até 64 caracteres.",
    };
  } else if (description.length < 8) {
    return {
      sucesso: false,
      mensagem: "A descrição precisa ter pelo menos 8 caracteres.",
    };
  } else if (description.length > 256) {
    return {
      sucesso: false,
      mensagem: "A descrição só pode ter até 256 caracteres.",
    };
  }

  const result = await prisma.notepad.updateMany({
    data: { title, description },
    where: {
      id,
      userId: user.id,
    },
  });

  if (result.count === 0) {
    return {
      sucesso: false,
      mensagem:
        "Anotação não encontrada ou você não tem permissão para editá-la.",
    };
  }

  return {
    sucesso: true,
    mensagem: "Anotação atualizada com sucesso!",
  };
}

// Deleta uma anotação pelo id SOMENTE se pertencer ao usuário logado
export async function deleteNotepad(id: number) {
  const { user } = await requireAuth();

  const result = await prisma.notepad.deleteMany({
    where: {
      id,
      userId: user.id,
    },
  });

  if (result.count === 0) {
    return {
      sucesso: false,
      mensagem:
        "Anotação não encontrada ou você não tem permissão para deletá-la.",
    };
  }

  return {
    sucesso: true,
    mensagem: "A anotação foi deletada com sucesso!",
  };
}

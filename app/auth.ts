"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function createUser(username: string, password: string) {
  if (username.length < 4 || username.length > 10) {
    return {
      success: false,
      message: "O nome de usuário precisa ter entre 4 e 10 caracteres.",
    };
  } else if (password.length < 6 || password.length > 64) {
    return {
      success: false,
      message: "A senha precisa ter entre 6 e 64 caracteres.",
    };
  }

  const userExists = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (userExists) {
    return {
      success: false,
      message: `O nome de usuário "${username}" já foi utilizado.`,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    message: "Conta criada com sucesso!",
  };
}

export async function login(username: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (user === null) {
    return {
      success: false,
      message: "Nome de usuário ou senha inválidos.",
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    return {
      success: true,
      message: `Seja bem-vinde, @${username}!`,
    };
  }

  return {
    success: false,
    message: "Nome de usuário ou senha inválidos.",
  };
}

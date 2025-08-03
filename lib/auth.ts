import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function currentUser() {
  const cookie = (await cookies()).get("auth");
  if (!cookie) return null;
  const userId = Number(cookie.value);
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user;
}

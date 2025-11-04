import { NextRequest, NextResponse } from "next/server";
import db from "@/src/db/db";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { build: true },
  });

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const data = await req.json();

  const updatedUser = await db.user.update({
    where: { id: session.user.id },
    data: {
      name: data.name,
      email: data.email,
      image: data.image,
    },
  });

  return NextResponse.json(updatedUser);
}

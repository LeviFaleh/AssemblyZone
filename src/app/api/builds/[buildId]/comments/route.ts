import { NextResponse } from "next/server";
import db from "@/src/db/db";
import { auth } from "@/src/lib/auth"; // 👈 ajuste o caminho conforme seu setup do Better Auth

export async function POST(
  req: Request,
  { params }: { params: { buildId: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const userId = session.user.id;
    const { buildId } = params;
    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
      return new NextResponse("Comentário vazio", { status: 400 });
    }

    const newComment = await db.buildComment.create({
      data: {
        text,
        buildId,
        userId,
      },
      include: { user: true },
    });

    return NextResponse.json(newComment);
  } catch (error) {
    console.error(error);
    return new NextResponse("Erro ao criar comentário", { status: 500 });
  }
}

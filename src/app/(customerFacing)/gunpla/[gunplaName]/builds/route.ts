import db from "@/src/db/db";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import fs from "fs";

export async function POST(
  req: NextRequest,
  { params }: { params: { gunplaName: string } }
) {
  const gunplaName = decodeURIComponent(params.gunplaName);
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const formData = await req.formData();
  const files = formData.getAll("images") as File[];
  const content = formData.get("content") as string;
  const title = formData.get("title") as string;

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  // Salvar todas as imagens
  const imagePaths: string[] = [];
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${randomUUID()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    imagePaths.push(`/uploads/${fileName}`);
  }

  try {
    const build = await db.build.create({
      data: {
        title,
        content,
        imagePaths,
        gunplaName,
        userId: session.user.id,
      },
    });

    return NextResponse.json(build);
  } catch (error) {
    console.error("Erro ao criar build:", error);
    return NextResponse.json({ error: "Erro ao criar build" }, { status: 500 });
  }
}



// import db from "@/src/db/db";
// import { auth } from "@/src/lib/auth";
// import { headers } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import { writeFile } from "fs/promises";
// import path from "path";
// import { randomUUID } from "crypto";
// import { redirect } from "next/navigation";

// export async function POST(
//   req: NextRequest,
//   context: { params: Promise<{ gunplaName: string }> }
// ) {
//   const { gunplaName } = await context.params;
//   const decodedName = decodeURIComponent(gunplaName);

//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session) {
//     redirect("/login");
//   }

//   const formData = await req.formData();
//   const file = formData.get("image") as File | null;
//   const content = formData.get("content") as string;

//   let imagePath: string | null = null;

//   if (file) {
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const fileName = `${randomUUID()}-${file.name}`;
//     const uploadDir = path.join(process.cwd(), "public", "uploads");
//     const filePath = path.join(uploadDir, fileName);

//     await writeFile(filePath, buffer);
//     imagePath = `/uploads/${fileName}`;
//   }

//   try {
//     const build = await db.build.create({
//       data: {
//         imagePaths: imagePath ? [imagePath] : [],
//         content,
//         gunplaName: decodedName,
//         userId: session.user.id,
//       },
//     });

//     return NextResponse.json(build);
//   } catch (error) {
//     console.error("Erro ao criar build:", error);
//     return NextResponse.json({ error: "Erro ao criar build" }, { status: 500 });
//   }
// }

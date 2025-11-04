
import { auth } from "@/src/lib/auth";
import db from "@/src/db/db";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import BuildCard from "@/src/components/BuildCard";

export default async function UserProfilePage() {
const session = await auth.api.getSession({ headers: await headers() });


  if (!session || !session.user) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Você não está logado</h1>
        <Link href="/login" className="text-blue-500 underline">
          Fazer login
        </Link>
      </div>
    );
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { build: {
      include: {
        user:{
          select:{
            name: true,
            image: true
          }
        }
      }
    }},
  });

  if (!user) {
    return <div className="p-6">Usuário não encontrado</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-6">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={100}
            height={100}
            className="rounded-full"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300" />
        )}
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-400">
            Conta criada em: {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <Link
            href="/user/edit"
            className="text-indigo-500 hover:underline mt-2 block"
          >
            Editar perfil
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Minhas Builds</h2>
        {user.build.length === 0 ? (
          <p className="text-gray-500">Você ainda não criou nenhuma build.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {user.build.map((build) => (
                      <BuildCard key={build.id} build={build} />
                    ))}
          </div>
        )}
      </div>
    </div>
  );
}

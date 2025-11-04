import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface BuildCardProps {
  build: {
    id: string;
    title: string;
    content: string | null;
    imagePaths: string[] | null;
    user: { name: string; image: string | null };
  };
}

export default function BuildCard({ build }: BuildCardProps) {
  return (
    <div className="bg-gray-200 p-4 rounded-lg flex flex-col gap-2">
      {/* Imagem da build */}
      {build.imagePaths && build.imagePaths.length > 0 && (
        <Image
          src={build.imagePaths[0]}
          alt={`Build de ${build.user.name}`}
          width={300}
          height={200}
          className="rounded-md object-cover w-full h-40"
        />
      )}

      {/* Autor */}
       <h2 className="text-lg font-bold text-black mb-1">{build.title}</h2>
      <p className="font-semibold text-black">{build.user.name}</p>

      {/* Conteúdo resumido */}
      {build.content && (
        <p className="text-gray-900 text-sm line-clamp-2">{build.content}</p>
      )}

      {/* Link para build completa */}
      <Button asChild size="lg" className="bg-yellow-300 hover:bg-yellow-400 text-black mt-auto">
                      <Link href={`/build/${build.id}`}> Ver Build</Link>
                  </Button>
    </div>
  );
}

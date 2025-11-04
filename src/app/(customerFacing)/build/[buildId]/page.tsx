

import db from "@/src/db/db";
import Link from "next/link";
import BuildGallery from "@/src/app/components/BuildGallery";
import CommentsSection from "@/src/app/components/CommentsSection"

type BuildPageProps = {
  params: Promise<{ buildId: string }>;
};

export default async function BuildPage({ params }: BuildPageProps) {
  const { buildId } =  await params;

  // Busca a build e inclui comentários + autor de cada comentário
  const build = await db.build.findUnique({
    where: { id: buildId },
    include: {
      user: true,
      gunpla: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!build) return <div className="p-6">Build não encontrada</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <Link
        href={`/gunpla/${encodeURIComponent(build.gunpla.name)}`}
        className="text-indigo-400 hover:underline mb-4 block"
      >
        ← Voltar para {build.gunpla.name}
      </Link>

      <div className="bg-gray-200 rounded-xl p-4">
        <h1 className="text-2xl font-bold text-black mb-2">{build.title}</h1>
        <p className="font-semibold text-black">{build.user.name}</p>
        <p className="text-sm text-gray-600">
          {new Date(build.createdAt).toLocaleString()}
        </p>

        <div className="flex flex-col md:flex-row gap-8 mt-4">
          <BuildGallery imagePaths={build.imagePaths} name={build.title} />
        </div>

        {build.content && (
          <p className="text-gray-800 whitespace-pre-wrap mt-4">
            {build.content}
          </p>
        )}
      </div>

      {/* Área de comentários */}
      <CommentsSection buildId={build.id} initialComments={build.comments}/>
    </div>
  );
}


// import db from "@/src/db/db";
// import Image from "next/image";
// import Link from "next/link";
// import BuildGallery from "@/src/app/components/BuildGallery"
// import GunplaGallery from "@/src/app/components/GunplaGallery";
// import { includes } from "better-auth";

// type BuildPageProps = {
//   params: { buildId: string };
// };

// export default async function BuildPage({ params }: BuildPageProps) {
//     const { buildId} =  params;

//     const build = await db.build.findUnique({
//       where: { id: buildId },
//       include: {user: true, gunpla: true, comments: true}
//     });

//   // const comments = await db.build.findMany({

//   // })

//   if (!build) return <div className="p-6">Build não encontrada</div>;

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <Link
//         href={`/gunpla/${encodeURIComponent(build.gunpla.name)}`}
//         className="text-indigo-400 hover:underline mb-4 block"
//       >
//         ← Voltar para {build.gunpla.name}
//       </Link>

//       <div className="bg-gray-200 rounded-xl p-4">
//         <h1 className="text-2xl font-bold text-black mb-2">{build.title}</h1>
//             <p className="font-semibold text-black">{build.user.name}</p>
//             <p className="text-sm text-gray-600">
//               {new Date(build.createdAt).toLocaleString()}
//             </p>
//             <div className="flex flex-col md:flex-row gap-8">
//                   <BuildGallery imagePaths={build.imagePaths} name={build.title} />
//                   </div>
//                   {build.content && (
//           <p className="text-gray-800 whitespace-pre-wrap mb-4">
//             {build.content}
//           </p>
//         )}
        
//           </div>
          
          
        

//         {/* {build.imagePaths?.length > 0 && (
//           <div className="grid grid-cols-1 gap-4 mt-2">
//             {build.imagePaths.map((path, idx) => (
//               <div key={idx} className="relative w-full h-64">
//                 <Image
//                   src={path}
//                   alt={`Build image ${idx + 1}`}
//                   fill
//                   className="rounded-lg object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         )} */}
//       </div>
//   );
// }

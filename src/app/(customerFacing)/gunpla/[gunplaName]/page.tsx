import db from "@/src/db/db";
import Link from "next/link";
import BuildCard from "@/src/components/BuildCard";
import GunplaGallery from "@/src/app/components/GunplaGallery";

type GunplaPageProps = {
  params: Promise<{ gunplaName: string }>;
};

export default async function GunplaPage({ params }: GunplaPageProps) {
  const { gunplaName } = await params;
  const decodedName = decodeURIComponent(gunplaName);

  const gunpla = await db.gunpla.findUnique({
    where: { name: decodedName },
    include: { builds: { include: { user: true } } },
  });

  if (!gunpla) return <div>Gunpla não encontrado</div>;

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold px-8">{gunpla.name}</h1>
        <Link
          href={`/gunpla/${encodeURIComponent(gunpla.name)}/novaBuild`}
          className="bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg shadow"
        >
          Começar Build
        </Link>
      </div>

      {/* Topo: imagem e descrição lado a lado */}
      <div className="flex flex-col md:flex-row gap-8">
        <GunplaGallery imagePaths={gunpla.imagePaths} name={gunpla.name} />

        <div className="flex flex-col justify-between flex-2 py-20">
          <p className="text-gray-700 text-lg mb-4">{gunpla.description}</p>
        </div>
      </div>



<h1 className="text-3xl font-bold px-8">Builds da Comunidade</h1>
      {/* Builds abaixo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gunpla.builds.map((build) => (
          <BuildCard key={build.id} build={build} />
        ))}
      </div>
    </div>
  );
}


// import db from "@/src/db/db";
// import Link from "next/link";
// import BuildCard from "@/src/components/BuildCard";
// import GunplaGallery from "@/src/app/components/GunplaGallery";

// type GunplaPageProps = {
//   params: Promise<{ gunplaName: string }>;
// };

// export default async function GunplaPage({ params }: GunplaPageProps) {
//   const { gunplaName } = await params;
//   const decodedName = decodeURIComponent(gunplaName);

//   const gunpla = await db.gunpla.findUnique({
//     where: { name: decodedName },
//     include: { builds: { include: { user: true } } },
//   });

//   if (!gunpla) return <div>Gunpla não encontrado</div>;

//   return (
//     <div className="flex flex-col md:flex-row gap-6 p-6">
//       {/* Coluna da galeria de imagens */}
//       <GunplaGallery imagePaths={gunpla.imagePaths} name={gunpla.name} />

//       {/* Coluna da descrição e builds */}
//       <div className="flex-1 flex flex-col">
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-gray-700">{gunpla.description}</p>
//           <Link
//             href={`/gunpla/${encodeURIComponent(gunpla.name)}/novaBuild`}
//             className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow"
//           >
//             Começar Build
//           </Link>
//         </div>
//       </div>
      


//        {/* Lista de builds */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {gunpla.builds.map((build) => (
//           <BuildCard key={build.id} build={build} />
//         ))}
//       </div>
//     </div>
//   );
// }


// import db from "@/src/db/db";
// import Image from "next/image";
// import Link from "next/link";
// import BuildCard from "@/src/components/BuildCard";

// type GunplaPageProps = {
//   params: Promise<{ gunplaName: string }>;
// };

// export default async function GunplaPage({ params }: GunplaPageProps) {
//   const { gunplaName } = await params;
//   const decodedName = decodeURIComponent(gunplaName);

//   const gunpla = await db.gunpla.findUnique({
//     where: { name: decodedName },
//     include: { builds: { include: { user: true } } },
//   });

//   if (!gunpla) return <div>Gunpla não encontrado</div>;
  

//   return (
//     <div className="flex flex-col md:flex-row gap-6 p-6">
//       {/* Coluna da imagem */}
//       <div className="flex flex-col gap-2 mr-4">
//            {gunpla.imagePaths.map((path, index) => (
//              <div key={index} className="relative w-20 h-20 cursor-pointer">
//                <Image
//                  src={path}
//                  alt={`${gunpla.name} thumb ${index + 1}`}
//                  fill
//                  className="rounded-lg object-cover"
//                />
//              </div>
//            ))}
//          </div>
//       <div className="relative flex-1">
//         <Image
//           src={gunpla.imagePaths?.[0] || "/placeholder.jpg"}
//           alt={gunpla.name}
//           width={700}
//           height={700}
//           className="rounded-xl object-cover w-full"
//         />
//         <h1 className="absolute top-4 left-4 text-3xl font-bold text-white drop-shadow-lg">
//           {gunpla.name}
//         </h1>
//       </div>

//       {/* Coluna da descrição e builds */}
//       <div className="flex-1 flex flex-col">
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-gray-700">{gunpla.description}</p>
//           <Link
//             href={`/gunpla/${encodeURIComponent(gunpla.name)}/novaBuild`}
//             className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow"
//           >
//             Começar Build
//           </Link>
//         </div>

//        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {gunpla.builds.map((build) => (
//             <BuildCard key={build.id} build={build} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


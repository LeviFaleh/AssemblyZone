



// import Link from "next/link";

// export default function GunplaCard({ gunpla }) {
//   return (
//     <Link href={`/forum/${encodeURIComponent(gunpla.name)}`}>
//       <div className="border rounded-xl p-4 hover:bg-gray-50 transition cursor-pointer">
//         <h2 className="font-bold text-lg">{gunpla.name}</h2>
//         <p className="text-gray-600 line-clamp-2">{gunpla.description}</p>
//         <div className="mt-2 text-sm text-gray-500">
//           {gunpla.builds.length} builds postadas
//         </div>
//       </div>
//     </Link>
//   );
// }


import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Gunpla } from "@prisma/client";


// type GunplaCardProps = {
//     id: string
//     name: string
//     brand: string
//     scale: string
//     grade: string
//     description: string
//     imagePath: string
// }

type GunplaCardProps = {
  gunpla: Gunpla & { builds?: any[] }; // ajuste builds se for necessário
};

export function GunplaCard({gunpla}: GunplaCardProps){
      if (!gunpla) {
    console.warn("GunplaCard recebeu 'gunpla' como undefined");
    return null;
  }

    return <Card className=" w-[500px] shrink-0 overflow-hidden flex-col bg-gray-200">
        <div className="relative w-full h-auto aspect-square">
            <Image src={gunpla.imagePaths[0]} fill alt={gunpla.name}/>
        </div>

        <div className="flex flex-col flex-grow px-4 py-2">
        <CardHeader className="p-0 mb-2">
            <CardTitle>{gunpla.name}</CardTitle>
            <CardDescription className="flex-grow text-sm text-gray-700"><p className="line-clamp-4">{gunpla.description}</p></CardDescription>
        </CardHeader>
        </div>
        <CardFooter className="mt-auto ">
            
            <Button asChild size="lg" className="w-full bg-yellow-300 hover:bg-yellow-400 text-black">
                <Link href={`gunpla/${encodeURIComponent(gunpla.name)}`}>Build</Link>
            </Button>
        </CardFooter>
    </Card>
}

export function ProductCardSkeleton(){
    return(
        <Card className="overflow-hidden flex flex-col animate-pulse">
            <div className="w-full aspect-video bg-grey-300"/>
            <CardHeader>
                <CardTitle>
                    <div className="w-3/4 h-6 rounded-full bg-grey-300"/>
                </CardTitle>
                <CardDescription>
                    <div className="w-1/2 h-4 rounded-full bg-grey-300"/>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="w-full h-4 rounded-full bg-grey-300"/>
                <div className="w-full h-4 rounded-full bg-grey-300"/>
                <div className="w-3/4 h-4 rounded-full bg-grey-300"/>
            </CardContent>
            <CardFooter>
                <Button className="w-full" disabled size="lg"></Button>
            </CardFooter>
        </Card>
    )
}
import BuildCard from "@/src/components/BuildCard"
import { GunplaCard, ProductCardSkeleton } from "@/src/components/GunplaCard"
import db from "@/src/db/db"
import { cache } from "@/src/lib/cache"
import { Build, Gunpla } from "@prisma/client"
import build from "next/dist/build"
import { Suspense } from "react"


// const getBuilds = cache( () => {
//     return db.build.findMany({
//         include: {
//     gunpla: true,
//     user: { select: { name: true, image: true } },
//     comments: {
//       include: {
//         user: { select: { name: true, image: true } },
//       },
//     },
//   },
//   orderBy: { createdAt: "desc" },
//     })
// }, ["/", "get"])


 const builds = await db.build.findMany({
    include: {
      gunpla: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })


function wait(duration: number){{
    return new Promise(resolve => setTimeout(resolve, duration))
}}

export default function HomePage() {
      return (
    <main className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Todas as Builds</h1>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {builds.map((build) => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>
      </Suspense>
    </main>
  )
}





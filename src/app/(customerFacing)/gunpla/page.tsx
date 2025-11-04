
import { authClient } from "@/src/lib/auth-client";
import { GunplaCard, ProductCardSkeleton } from "../../../components/GunplaCard";
import db from "@/src/db/db";
import { cache } from "@/src/lib/cache";
import { Gunpla } from "@prisma/client";
import { Suspense } from "react";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



type GunplaWithBuilds = Gunpla & { builds: any[] };


const getBandaiGunpla = cache(() => {
    return db.gunpla.findMany({
        where: { brand: "Bandai" },
        include: { builds: true },
    })
}, ["/gunpla", "getBandaiGunpla"])

const getSnaaGunpla = cache(() => {
    return db.gunpla.findMany({
        where: { brand: "SNAA" },
        include: { builds: true },
    })
}, ["/gunpla", "getSnaaGunpla"])

const get144Gunpla = cache(() => {
    return db.gunpla.findMany({
        where: { scale: "1/144" },
        include: { builds: true },
    })
}, ["/gunpla", "get144Gunpla"])

const get100Gunpla = cache(() => {
    return db.gunpla.findMany({
        where: { scale: "1/100" },
        include: { builds: true },
    })
}, ["/gunpla", "get100Gunpla"])

const get64Gunpla = cache(() => {
    return db.gunpla.findMany({
        where: { scale: "1/64" },
        include: { builds: true },
    })
}, ["/gunpla", "get64Gunpla"])

const getEgGunpla = cache(() => {
    return db.gunpla.findMany({
        where: { grade: "Entry Grade" },
        include: { builds: true },
    })
}, ["/gunpla", "getEgGunpla"])

const getHgGunpla = cache(() => {
    return db.gunpla.findMany({
        where: { grade: "High Grade" },
        include: { builds: true },
    })
}, ["/gunpla", "getHgGunpla"])

const getRgGunpla = cache(() => {
    return db.gunpla.findMany({
        where: { grade: "Real Grade" },
        include: { builds: true },
    })
}, ["/gunpla", "getRgGunpla"])

const getMgGunpla = cache(() => {
    return db.gunpla.findMany({
        where: { grade: "Master Grade" },
        include: { builds: true },
    })
}, ["/gunpla", "getMgGunpla"])

const getPgGunpla = cache(() => {
    return db.gunpla.findMany({
        where: { grade: "Perfect Grade" },
        include: { builds: true },
    })
}, ["/gunpla", "getPgGunpla"])

type GunplaGridSectionProps = {
  title: string;
  gunplaFetcher: () => Promise<GunplaWithBuilds[]>;
};

function wait(duration: number) {
    {
        return new Promise(resolve => setTimeout(resolve, duration))
    }
}

export default async function GunplaCatalogPage() {



    return <main className="space-y-14 scrollbar-hide">
        
<GunplaGridSection title="Bandai kits" gunplaFetcher={getBandaiGunpla} />
        <GunplaGridSection title="SNAA kits" gunplaFetcher={getSnaaGunpla} />

        <GunplaGridSection title="Entry Grade" gunplaFetcher={getEgGunpla} />

        <GunplaGridSection title="High Grade" gunplaFetcher={getHgGunpla} />

        <GunplaGridSection title="Real Grade" gunplaFetcher={getRgGunpla} />

        <GunplaGridSection title="Master Grade" gunplaFetcher={getMgGunpla} />

        <GunplaGridSection title="Perfect Grade" gunplaFetcher={getPgGunpla} />

        <GunplaGridSection title="1/144 kits" gunplaFetcher={get144Gunpla} />

        <GunplaGridSection title="1/100 kits" gunplaFetcher={get100Gunpla} />

        <GunplaGridSection title="1/64 kits" gunplaFetcher={get64Gunpla} />


    </main>
}

// async function GunplaSuspense() {
//     const products = await getGunpla()
//     return products.map(gunpla => (<GunplaCard key={gunpla.id} {...gunpla} />))
// }


function GunplaGridSection({ gunplaFetcher, title }: GunplaGridSectionProps) {
    return (
        <div className="space-y-8">
            <div className="flex gap-10 px-8">
                <h2 className="text-3xl font-bold">{title}</h2>
            </div>
            <div className="flex overflow-x-auto space-x-4 scrollbar-hide">

                <Suspense fallback={
                    <>
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </>
                }>

                    <GunplaSuspense gunplaFetcher={gunplaFetcher} />

                </Suspense>

            </div>
        </div>
    )
}

// async function GunplaSuspense({
//     gunplaFetcher,
// }: {
//     gunplaFetcher: () => Promise<Gunpla[]>
// }) {
//     return (await gunplaFetcher()).map(gunpla => (
//         <GunplaCard key={gunpla.id} {...gunpla} />
//         )
// )
// }

export async function GunplaSuspense({
    gunplaFetcher,
}: {
    gunplaFetcher: () => Promise<(Gunpla & { builds: any[] })[]>

}) {
    const gunplas = await gunplaFetcher();
    return (
        <>
            {gunplas.map((gunpla) => (
                <GunplaCard key={gunpla.id} gunpla={gunpla} />

            ))}
        </>
    );
}

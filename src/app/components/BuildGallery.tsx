"use client";
import { useState } from "react";
import Image from "next/image";

type BuildGalleryProps = {
  imagePaths: string[];
  name: string;
};

export default function BuildGallery({ imagePaths, name }: BuildGalleryProps) {
  const [mainImage, setMainImage] = useState(imagePaths[0]);

  return (
    console.log("mainImage:", mainImage),


    <div className="flex flex-col md:flex-col gap-2 p-6">
      {/* Coluna de miniaturas */}
      <div className="flex flex-col gap-2 mr-4">
        {imagePaths.map((path, index) => (
          <div
            key={index}
            className="relative w-20 h-20 cursor-pointer"
            onClick={() => setMainImage(path)}
          >
            <Image
              src={path}
              alt={`${name} thumb ${index + 1}`}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
      {/* Imagem principal */}
    <div className="relative flex-1 " >
            <Image
              src={mainImage}
              alt={name}
              width={600}
              height={600}
              className="rounded-xl object-cover w-full"
            />
          </div>

    </div>
  );
}

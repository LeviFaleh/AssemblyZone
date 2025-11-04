import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ images }: { images: string[] }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex gap-2">
      {/* Thumbnails */}
      <div className="flex flex-row gap-2">
        {images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`Image ${idx + 1}`}
            width={80}
            height={80}
            className={`cursor-pointer rounded ${selected === idx ? "ring-2 ring-indigo-500" : ""}`}
            onClick={() => setSelected(idx)}
          />
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1">
        <Image
          src={images[selected]}
          alt={`Main image`}
          width={300}
          height={300}
          className="rounded-lg object-contain"
        />
      </div>
    </div>
  );
}

'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";


type NovaBuildPageProps = {
  params: Promise<{ gunplaName: string }>;
};

export default function NovaBuildPage({ params }: NovaBuildPageProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Adicione um título para sua build");
      return;
    }

    if (!content.trim() && files.length === 0) {
      alert('Adicione texto ou imagens antes de postar');
      return;
    }
            const { gunplaName } = await params;
    const decodedName = decodeURIComponent(gunplaName);


    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    files.forEach((file) => formData.append('images', file));

    const res = await fetch(`/gunpla/${encodeURIComponent(decodedName)}/builds`, {
      method: 'POST',
      body: formData,
    });

    setLoading(false);

    if (!res.ok) {
      alert('Erro ao salvar a build.');
      return;
    }

    router.push(`/gunpla/${encodeURIComponent(decodedName)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 bg-gray-200 p-4 rounded-xl">
      <input
        type="text"
        placeholder="Título da Build"
        className="w-full rounded-lg p-2 bg-gray-300 text-black"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full rounded-lg p-2 bg-gray-300 text-black"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Compartilhe sua experiência com este Gunpla..."
      />
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
        className="text-black"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg"
      >
        {loading ? 'Enviando...' : 'Postar'}
      </button>
    </form>
  );
}



// 'use client';

// import { useState } from 'react';

// type NovaBuildPageProps = {
//   params: Promise<{ gunplaName: string }>;
// };
// export default function NovaBuildPage({ params }: NovaBuildPageProps) {
//   const [title, setTitle] = useState('');
//   const [file, setFile] = useState<File | null>(null);
//   const [content, setContent] = useState('');
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     if (!title.trim()) {
//       alert('Adicione um título para sua build.');
//       return;
//     }

//     if (!content.trim() && !file) {
//       alert('Adicione um texto ou uma imagem antes de postar');
//       return;
//     }

//         const { gunplaName } = await params;
//     const decodedName = decodeURIComponent(gunplaName);


//     setLoading(true);

//     const formData = new FormData();
//     formData.append('title', title);
//     if (file) formData.append('image', file);
//     formData.append('content', content);

//     const res = await fetch(`/gunpla/${encodeURIComponent(decodedName)}/builds`, {
//       method: 'POST',
//       body: formData,
//     });

//     setLoading(false);

//     if (!res.ok) {
//       alert('Erro ao salvar a build.');
//       return;
//     }

//     setTitle('');
//     setFile(null);
//     setContent('');
//     alert('Build postada com sucesso!');
//   }

//   return (
//     <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 bg-gray-800 p-4 rounded-xl">
//       <input
//         type="text"
//         className="w-full rounded-lg p-2 bg-gray-700 text-white"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Título da sua build"
//       />
//       <textarea
//         className="w-full rounded-lg p-2 bg-gray-700 text-white"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Compartilhe sua experiência com este Gunpla..."
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setFile(e.target.files?.[0] || null)}
//         className="text-white"
//       />
//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
//       >
//         {loading ? 'Enviando...' : 'Postar'}
//       </button>
//     </form>
//   );
// }


// 'use client';

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// type NovaBuildPageProps = {
//   params: Promise<{ gunplaName: string }>;
// };

// export default function NovaBuildPage({ params }: NovaBuildPageProps) {
//   const [file, setFile] = useState<File | null>(null);
//   const [content, setContent] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     const { gunplaName } = await params;
//     const decodedName = decodeURIComponent(gunplaName);

//     if (!content.trim() && !file) {
//       alert('Adicione um texto ou uma imagem antes de postar');
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     if (file) formData.append('image', file);
//     formData.append('content', content);

//     const res = await fetch(`/gunpla/${encodeURIComponent(decodedName)}/builds`, {
//       method: 'POST',
//       body: formData,
//     });

//     setLoading(false);

//     if (!res.ok) {
//       alert('Erro ao salvar a build.');
//       return;
//     }

//     router.push(`/gunpla/${encodeURIComponent(decodedName)}`);
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6 space-y-6">
//       <h1 className="text-2xl font-bold mb-4">Criar nova build</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-800 p-4 rounded-xl">
//         <textarea
//           className="w-full rounded-lg p-2 bg-gray-700 text-white"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Conte sobre a sua build..."
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//           className="text-white"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
//         >
//           {loading ? 'Enviando...' : 'Postar Build'}
//         </button>
//       </form>
//     </div>
//   );
// }






  'use client';

  import { useState } from 'react';

  export default function NewBuildForm({ gunplaName }: { gunplaName: string }) {
    const [file, setFile] = useState<File | null>(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (!content.trim() && !file) {
        alert('Adicione um texto ou uma imagem antes de postar');
        return;
      }

      setLoading(true);

      const formData = new FormData();
      if (file) formData.append('image', file);
      formData.append('content', content);

      const res = await fetch(`/gunpla/${encodeURIComponent(gunplaName)}/builds`, {
        method: 'POST',
        body: formData,
      });

      setLoading(false);

      if (!res.ok) {
        alert('Erro ao salvar a build.');
        return;
      }

      // Limpa o formulário
      setFile(null);
      setContent('');
      alert('Build postada com sucesso!');
    }

    return (
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 bg-gray-800 p-4 rounded-xl">
        <textarea
          className="w-full rounded-lg p-2 bg-gray-700 text-white"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Compartilhe sua experiência com este Gunpla..."
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          {loading ? 'Enviando...' : 'Postar'}
        </button>
      </form>
    );
  }

// 'use client';

// import { useState } from 'react';
// import { Button } from './ui/button';
// import { useFormStatus } from 'react-dom';

// export default function NewBuildForm({ gunplaName }: { gunplaName: string }) {
//   const [file, setFile] = useState<File | null>(null);
//   const [content, setContent] = useState('');

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     if (!file) {
//       alert('Selecione uma imagem primeiro');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', file);
//     formData.append('content', content);

//     await fetch(`/forum/gunpla/${encodeURIComponent(gunplaName)}/builds`, {
//       method: 'POST',
//       body: formData,
//     });

//     setFile(null);
//     setContent('');
//   }

//   return (
//     <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 bg-gray-800 p-4 rounded-xl">
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
//       <SubmitButton />
//     </form>
//   );
//   function SubmitButton() {
//         const { pending } = useFormStatus()

//         return (
//             <Button type="submit" disabled={pending}>
//                 { pending ? "Saving..." : "Save"}
//             </Button>
//         )
//     }
// }

// // 'use client';

// // import { useState } from 'react';

// // export default function NewBuildForm({ gunplaName }: { gunplaName: string }) {
// //   const [imagePath, setImagePath] = useState('');
// //   const [content, setContent] = useState('');

// //   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
// //     e.preventDefault();
// //     await fetch(`/api/forum/${encodeURIComponent(gunplaName)}/builds`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ imagePath, content }),
// //     });
// //     setImagePath('');
// //     setContent('');
// //     // Aqui pode usar router.refresh() para recarregar builds
// //   }

// //   return (
// //     <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 bg-gray-800 p-4 rounded-xl">
// //       <textarea
// //         className="w-full rounded-lg p-2 bg-gray-700 text-white"
// //         value={content}
// //         onChange={(e) => setContent(e.target.value)}
// //         placeholder="Compartilhe sua experiência com este Gunpla..."
// //       />
// //       <input
// //         type="text"
// //         className="w-full border rounded-lg p-2 bg-gray-700 text-white"
// //         value={imagePath}
// //         onChange={(e) => setImagePath(e.target.value)}
// //         placeholder="URL da imagem da build (opcional)"
// //       />
// //       <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg">
// //         Postar
// //       </button>
// //     </form>
// //   );
// // }
"use client";

import { useState } from "react";
import { useSession } from "@/src/lib/auth-client";

type Comment = {
  id: string;
  text: string;
  createdAt: Date;
  user: { name: string };
};

type CommentsSectionProps = {
  buildId: string;
  initialComments: Comment[];
};

export default function CommentsSection({
  buildId,
  initialComments,
}: CommentsSectionProps) {
   const { data: session } = useSession();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function addComment() {
    if (!session) {
      alert("Você precisa estar logado para comentar.");
      return;
    }

    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/builds/${buildId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newComment }),
      });

      if (!res.ok) throw new Error("Erro ao enviar comentário");

      const created = await res.json();
      setComments((prev) => [created, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar comentário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-semibold text-lg mb-3 text-black">Comentários</h2>

      {!session ? (
        <p className="text-gray-500 mb-2">
          Faça login para comentar esta build.
        </p>
      ) : (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Digite um comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          />
          <button
            onClick={addComment}
            disabled={loading}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      )}

      <div className="space-y-3">
        {comments.length === 0 && (
          <p className="text-gray-500 text-sm">Nenhum comentário ainda.</p>
        )}

        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border border-gray-200 rounded-lg p-2 bg-gray-50"
          >
            <p className="font-semibold text-black text-sm">
              {comment.user?.name || "Usuário"}
            </p>
            <p className="text-gray-700">{comment.text}</p>
            <p className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


// "use client";

// import { useState } from "react";

// type Comment = {
//   id: string;
//   text: string;
//   createdAt: string;
//   user: { name: string };
// };

// type CommentsSectionProps = {
//   buildId: string;
//   initialComments: Comment[];
// };

// export default function CommentsSection({
//   buildId,
//   initialComments,
// }: CommentsSectionProps) {
//   const [comments, setComments] = useState(initialComments);
//   const [newComment, setNewComment] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function addComment() {
//     if (!newComment.trim()) return;

//     setLoading(true);
//     try {
//       const res = await fetch(`/api/builds/${buildId}/comments`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: newComment }),
//       });

//       if (!res.ok) throw new Error("Erro ao enviar comentário");

//       const created = await res.json();
//       setComments((prev) => [created, ...prev]);
//       setNewComment("");
//     } catch (err) {
//       console.error(err);
//       alert("Erro ao enviar comentário");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md">
//       <h2 className="font-semibold text-lg mb-3 text-black">Comentários</h2>

//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Digite um comentário..."
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
//         />
//         <button
//           onClick={addComment}
//           disabled={loading}
//           className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
//         >
//           {loading ? "Enviando..." : "Enviar"}
//         </button>
//       </div>

//       <div className="space-y-3">
//         {comments.length === 0 && (
//           <p className="text-gray-500 text-sm">Nenhum comentário ainda.</p>
//         )}

//         {comments.map((comment) => (
//           <div
//             key={comment.id}
//             className="border border-gray-200 rounded-lg p-2 bg-gray-50"
//           >
//             <p className="font-semibold text-black text-sm">
//               {comment.user?.name || "Usuário"}
//             </p>
//             <p className="text-gray-700">{comment.text}</p>
//             <p className="text-xs text-gray-500">
//               {new Date(comment.createdAt).toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

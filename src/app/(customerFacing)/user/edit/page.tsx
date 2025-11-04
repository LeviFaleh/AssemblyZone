'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch('/api/user/me');
            if (res.ok) {
                const user = await res.json();
                setName(user.name);
                setEmail(user.email);
                setImage(user.image || '');
            }
            setLoading(false);
        }
        fetchUser();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const res = await fetch('/api/user/me', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, image }),
        });

        if (res.ok) {
            alert('Perfil atualizado!');
            router.push('/user');
        } else {
            alert('Erro ao atualizar perfil');
        }
    }

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col">
                    Nome:
                    <input
                        type="text"
                        className="border rounded p-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label className="flex flex-col">
                    Email:
                    <input
                        type="email"
                        className="border rounded p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label className="flex flex-col">
                    URL da Imagem:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="text-white"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
                >
                    Salvar Alterações
                </button>
            </form>
        </div>
    );
}

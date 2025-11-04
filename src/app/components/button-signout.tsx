"use client"

import { Button } from "@/src/components/ui/button";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";


export function ButtonSignOut() {
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions:{
        onSuccess: () => {
          router.replace("/login")
        }
      }
    })
  }

  return (
    <Button onClick={signOut}>
      Sair da conta
    </Button>
  );
}
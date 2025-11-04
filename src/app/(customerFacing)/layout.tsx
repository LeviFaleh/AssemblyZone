import { Nav, NavLink } from "@/src/components/Nav"
import "./style.css";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

   const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session){
        redirect("/login")
    }
  return (
    // <>
    //   <Nav>
    //     <NavLink href="/">Home</NavLink>
    //     <NavLink href="/products">Products</NavLink>
    //     <NavLink href="/orders">My Orders</NavLink>
    //   </Nav>
    //   <div className="container my-6">{children}</div>
    // </>
            <>
            <header>
            </header>

            <div className="navbar">
                <ul>
                    <li><a href="/">HOME PAGE &gt; </a></li>
                    <li><a href="/gunpla">GUNPLA CATALOG &gt;</a></li>
                    <li><a href="/user">MY ACCOUNT &gt;</a></li>
                </ul>
            </div>
            <div className="container my-6">{children}</div>
        </>

  )
}
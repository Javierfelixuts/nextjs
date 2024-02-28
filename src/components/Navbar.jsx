import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";

async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <nav className=" header flex justify-between items-center text-black px-24 py-3">
      <Image
      alt="bankapp"
      className="mt-5"
       src='/icon-192x192.png'
      height={50}
      width={50} 
      
      />

      <ul className="flex gap-x-2">
        {!session?.user ? (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li className="underline">
              <Link href="/api/auth/signout">Log Out</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
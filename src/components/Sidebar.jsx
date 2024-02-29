import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";

async function Sidebar() {
  const session = await getServerSession(authOptions);

  return (
    <aside className="aside h-100 w-30 text-white py-3 shadow-md">
      <div className="w-100 flex justify-center">

        <Image
        alt="bankapp"
        className="logo md:mx-auto my-5 border md:border-0"
        src='/icon-192x192.png'

        height={50}
        width={50} 
        
        />
      </div>


      <ul className="flex flex-col gap-x-2 ms-4 text-sm" style={{height: "100%"}}>
        {!session?.user ? (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auth/login">Banks</Link>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
               className="py-1 px-2 rounded-s-2xl block"
              href="/dashboard">Banks</Link>
            </li>
            <li >
              <Link
              className="py-1 px-2 rounded-s-2xl block" 
               href="/dashboard/transactions">Transactions</Link>
            </li>
            <li >
              <Link 
              className="py-1 px-2 rounded-s-2xl block"
              href="/dashboard/accounts">Accounts</Link>
            </li>

            <li >
              <Link className="py-1 px-2 rounded-s-2xl block" href="/api/auth/signout">Log out</Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Sidebar() {
  const session = await getServerSession(authOptions);

  return (
    <aside className="aside h-100 w-30 text-white py-3 shadow-md">
      <ul className="flex flex-col gap-x-2 ms-4" style={{height: "100%"}}>
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
          <div>
            <li>
              <Link href="/dashboard">Banks</Link>
            </li>
            <li>
              <Link href="/dashboard/transactions">Transactions</Link>
            </li>
            <li>
              <Link href="/dashboard/accounts">Accounts</Link>
            </li>
            </div>

            <li>
              <Link href="/api/auth/signout">Log out</Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
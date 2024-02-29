import { redirect } from 'next/navigation';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >BANK APP</a>
          <label htmlFor="">cree una tabla User directamente en vercel para saber si funcionará: </label>
        <a href="/auth/login">Login</a>
    </main>
  );
}



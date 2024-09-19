import Link from "next/link";

export default function Home() {
  const anno = new Date().getFullYear();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <span className="text-3xl sm:text-5xl row-start-1">
        Fanta Coca {anno}
      </span>
      <main className="flex flex-col gap-8 row-start-2 items-center w-full justify-center">
        <span>Work is still in progress...</span>
        <Link
          href={"scheda"}
          className="p-5 w-full max-w-100 text-center text-lg bg-white text-black rounded-md hover:rounded-3xl transition-[border-radius]"
        >
          Invia la tua scheda
        </Link>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center flex-col sm:flex-row">
        <span>
          Creato da Quokka Premuroso (
          <code className="text-sm">
            <a href="https://daw-dev.github.io">daw._.dev</a>
          </code>
          )
        </span>
        <span>21/07/2024</span>
      </footer>
    </div>
  );
}

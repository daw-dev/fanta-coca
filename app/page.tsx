import Link from "next/link";

export default function Home() {
  const anno = new Date().getFullYear();
  return (
    <div className="grid grid-rows-[60px_1fr_100px] md:grid-rows-[60px_1fr_50px] items-center justify-items-center min-h-screen p-8 pb-5 gap-10 md:px-32 md:py-12 font-[family-name:var(--font-geist-sans)]">
      <span className="text-3xl md:text-5xl row-start-1">
        Fanta CoCa {anno}
      </span>
      <main className="flex flex-col gap-8 row-start-2 items-center w-full justify-center">
        <span>Work is still in progress...</span>
        <Link href={"scheda"} className="cool-button">
          Invia la tua scheda
        </Link>
        <Link href={"risultati"} className="cool-button">
          Guarda i risultati
        </Link>
        <Link href={"feedback"} className="cool-button">
          Invia un feedback
        </Link>
      </main>
      <footer className="row-start-3 flex gap-4 md:gap-10 flex-wrap items-center justify-center flex-col md:flex-row">
        <span className="flex gap-x-2 flex-col md:flex-row items-center justify-center">
          <span>Creato da Quokka Premuroso</span>
          <span>
            (
            <code className="text-sm">
              <a href="https://daw-dev.github.io">daw._.dev</a>
            </code>
            )
          </span>
        </span>
        <span>21/09/2024</span>
      </footer>
    </div>
  );
}

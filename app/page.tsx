import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Blackjack</h1>
        <p>Blackjack is a card game where the goal is to get as close to 21 as possible without going over.</p>
      </main>
    </div>
  );
}

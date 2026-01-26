"use client";

import { useState, useEffect } from "react";
import PlayingCard, { Suit, Value } from "@/components/PlayingCard";

const SUITS: Suit[] = ["♠️", "❤️", "♣️", "♦️"];
const VALUES: Value[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export default function Home() {
  const [randomCards, setRandomCards] = useState<{ suit: Suit; value: Value }[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Generate two random unique cards
    const generateCards = () => {
      const cards: { suit: Suit; value: Value }[] = [];
      while (cards.length < 2) {
        const suit = SUITS[Math.floor(Math.random() * SUITS.length)];
        const value = VALUES[Math.floor(Math.random() * VALUES.length)];
        if (!cards.find(c => c.suit === suit && c.value === value)) {
          cards.push({ suit, value });
        }
      }
      setRandomCards(cards);
    };

    generateCards();
  }, []);

  if (randomCards.length === 0) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 font-sans dark:bg-zinc-900 transition-colors">
      <main className="flex flex-col items-center gap-16 w-full max-w-2xl">
        <header className="text-center">
          <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100 italic">
            Blackjack
          </h1>
        </header>

        <section className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Simple Deck */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-44 bg-white border border-zinc-200 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-2xl text-zinc-300">🂠</span>
            </div>
            <p className="text-xs text-zinc-400">The deck</p>
          </div>

          {/* Cards on the table */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-4">
              <PlayingCard
                suit={randomCards[0].suit}
                value={randomCards[0].value}
                isFaceUp={isFlipped}
                onClick={() => setIsFlipped(true)}
              />
              <p className="text-xs text-zinc-400">{isFlipped ? "Face up" : "Click to flip"}</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <PlayingCard
                suit={randomCards[1].suit}
                value={randomCards[1].value}
                isFaceUp={true}
              />
              <p className="text-xs text-zinc-400">Visible</p>
            </div>
          </div>
        </section>

        <footer>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            New Game
          </button>
        </footer>
      </main>
    </div>
  );
}

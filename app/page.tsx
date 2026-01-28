"use client";

import { useState, useEffect } from "react";
import PlayingCard, { Suit, Value } from "@/components/PlayingCard";

const SUITS: Suit[] = ["♠️", "❤️", "♣️", "♦️"];
const VALUES: Value[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export default function Home() {
  const [deck, setDeck] = useState<{ suit: Suit; value: Value }[]>([]);
  const [playerHand, setPlayerHand] = useState<{ suit: Suit; value: Value }[]>([]);
  const [dealerHand, setDealerHand] = useState<{ suit: Suit; value: Value }[]>([]);
  const [isActiveRound, setIsActiveRound] = useState(false);
  const [discardPile, setDiscardPile] = useState<{ suit: Suit; value: Value }[]>([]);

  useEffect(() => {
    const newDeck: { suit: Suit; value: Value }[] = [];
    SUITS.forEach((suit) => {
      VALUES.forEach((value) => {
        newDeck.push({ suit, value });
      });
    });

    // Simple shuffle
    newDeck.sort(() => Math.random() - 0.5);

    setDeck(newDeck);
  }, []);

  if (deck.length === 0) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 font-sans dark:bg-zinc-900 transition-colors">
      <main className="flex flex-col items-center gap-16 w-full max-w-2xl">
        <header className="text-center">
          <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100 italic">
            Blackjack
          </h1>
        </header>

        <section className="flex flex-col gap-12 items-center w-full">
          {/* Dealer's Hand */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Dealer</p>
            <div className="flex gap-4">
              {isActiveRound ? (
                <>
                  <PlayingCard suit={dealerHand[0].suit} value={dealerHand[0].value} />
                  <div className="w-32 h-44 bg-zinc-200 dark:bg-zinc-800 rounded-lg shadow-inner flex items-center justify-center text-zinc-400">
                    <span className="text-2xl">?</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-32 h-44 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg" />
                  <div className="w-32 h-44 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg" />
                </>
              )}
            </div>
          </div>

          {/* Player's Hand */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              {isActiveRound ? (
                playerHand.map((card, i) => (
                  <PlayingCard key={i} suit={card.suit} value={card.value} />
                ))
              ) : (
                <>
                  <div className="w-32 h-44 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg" />
                  <div className="w-32 h-44 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg" />
                </>
              )}
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Player</p>
          </div>
        </section>
        <section>
          <button
            disabled={isActiveRound}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${isActiveRound
              ? "bg-zinc-100 text-zinc-400 cursor-not-allowed dark:bg-zinc-800"
              : "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-lg"
              }`}
            onClick={() => {
              setIsActiveRound(true);
              setPlayerHand([deck[0], deck[1]]);
              setDealerHand([deck[2]]);
              setDeck(deck.slice(3));
            }}
          >
            {isActiveRound ? "Round in Progress" : "Deal Cards"}
          </button>
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

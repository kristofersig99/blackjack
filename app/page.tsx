"use client";

import { useState, useEffect } from "react";
import PlayingCard, { Suit, Value } from "@/components/PlayingCard";

const SUITS: Suit[] = ["♠️", "❤️", "♣️", "♦️"];
const VALUES: Value[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const calculateHandValue = (hand: { value: Value }[]) => {
  let value = 0;
  let aces = 0;

  hand.forEach((card) => {
    if (card.value === "A") {
      aces += 1;
      value += 11;
    } else if (["J", "Q", "K"].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }
  });

  while (value > 21 && aces > 0) {
    value -= 10;
    aces -= 1;
  }

  return value;
};

const checkOutcome = (playerValue: number, dealerValue: number) => {
  if (playerValue > 21) return "Busted! You Lose!";
  if (dealerValue > 21) return "Dealer Busted! You Win!";
  if (playerValue > dealerValue) return "You Win!";
  if (dealerValue > playerValue) return "Dealer Wins!";
  return "Push!";
};

const getShuffledDeck = () => {
  const newDeck: { suit: Suit; value: Value }[] = [];
  SUITS.forEach((suit) => {
    VALUES.forEach((value) => {
      newDeck.push({ suit, value });
    });
  });
  return newDeck.sort(() => Math.random() - 0.5);
};


export default function Home() {
  const [deck, setDeck] = useState<{ suit: Suit; value: Value }[]>([]);
  const [playerHand, setPlayerHand] = useState<{ suit: Suit; value: Value }[]>([]);
  const [dealerHand, setDealerHand] = useState<{ suit: Suit; value: Value }[]>([]);
  const [isActiveRound, setIsActiveRound] = useState(false);
  const [isDealerTurn, setIsDealerTurn] = useState(false);
  const [gameStatus, setGameStatus] = useState(true);

  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  useEffect(() => {
    setDeck(getShuffledDeck());
  }, []);

  useEffect(() => {
    if (isDealerTurn && playerValue < 22 && dealerValue < 17) {
      setDealerHand([...dealerHand, deck[0]]);
      setDeck(deck.slice(1));
    }
  }, [isDealerTurn, playerValue, dealerValue, deck, isActiveRound])

  useEffect(() => {
    if (playerValue > 21 || dealerValue > 16) {
      setGameStatus(false);
    }
  }, [playerValue, dealerValue]);

  if (deck.length === 0) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 font-sans dark:bg-zinc-900">
      <main className="flex flex-col items-center gap-16 w-full max-w-2xl">
        <header className="text-center">
          <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100 italic">
            Blackjack
          </h1>
        </header>

        <div className="relative w-full">
          <section className="flex flex-col gap-12 items-center w-full">
            {/* Dealer's Hand */}
            <div className="flex flex-col items-center gap-4">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Dealer {isActiveRound && `(${dealerValue})`}
              </p>
              <div className="flex gap-4">
                {isActiveRound ? (
                  isDealerTurn ? (
                    dealerHand.map((card, i) => (
                      <PlayingCard key={i} suit={card.suit} value={card.value} />
                    ))
                  ) : (
                    <>
                      <PlayingCard suit={dealerHand[0].suit} value={dealerHand[0].value} />
                      <div className="w-32 h-44 bg-zinc-200 dark:bg-zinc-800 rounded-lg shadow-inner flex items-center justify-center text-zinc-400">
                        <span className="text-2xl">?</span>
                      </div>
                    </>
                  )
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
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Player {isActiveRound && `(${playerValue})`}
              </p>
            </div>
          </section>

          {/* Game Status Overlay */}
          {!gameStatus && isActiveRound && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md px-8 py-4 rounded-2xl shadow-2xl border border-white/20 dark:border-zinc-700/50">
                <h2 className="text-3xl font-bold bg-gradient-to-tr from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
                  {checkOutcome(playerValue, dealerValue)}
                </h2>
              </div>
            </div>
          )}
        </div>


        <section className="flex gap-4">
          <button
            disabled={isActiveRound && gameStatus}
            className={`px-6 py-2 rounded-full text-sm font-medium ${isActiveRound && gameStatus
              ? "bg-zinc-100 text-zinc-400 cursor-not-allowed dark:bg-zinc-800"
              : "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-lg"
              }`}
            onClick={() => {
              setIsActiveRound(true);
              setGameStatus(true);
              setIsDealerTurn(false);

              //Shuffle deck if too few cards
              let activeDeck = deck;
              if (deck.length < 10) {
                activeDeck = getShuffledDeck();
              }

              setPlayerHand([activeDeck[0], activeDeck[1]]);
              setDealerHand([activeDeck[2]]);
              setDeck(activeDeck.slice(3));
            }}
          >
            {isActiveRound && gameStatus ? "Round in Progress" : "Deal Cards"}
          </button>

          <button
            disabled={!isActiveRound || playerValue > 21 || isDealerTurn}
            className={`px-6 py-2 rounded-full text-sm font-medium ${!isActiveRound || playerValue > 21 || isDealerTurn
              ? "bg-zinc-100 text-zinc-400 cursor-not-allowed dark:bg-zinc-800"
              : "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-lg"
              }`}
            onClick={() => {
              setPlayerHand([...playerHand, deck[0]]);
              setDeck(deck.slice(1));
            }}
          >
            Hit
          </button>
          <button
            disabled={!isActiveRound || playerValue > 21 || isDealerTurn}
            className={`px-6 py-2 rounded-full text-sm font-medium ${!isActiveRound || playerValue > 21 || isDealerTurn
              ? "bg-zinc-100 text-zinc-400 cursor-not-allowed dark:bg-zinc-800"
              : "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-lg"
              }`}
            onClick={() => {
              setIsDealerTurn(true);
            }}
          >
            Stand
          </button>
        </section>
        <footer>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            New Game
          </button>
        </footer>
      </main>
    </div>
  );
}

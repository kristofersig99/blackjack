"use client";

import React from "react";

export type Suit = "♠️" | "❤️" | "♣️" | "♦️";
export type Value = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

export interface CardProps {
    suit: Suit;
    value: Value;
    isFaceUp?: boolean;
    onClick?: () => void;
}

const PlayingCard: React.FC<CardProps> = ({ suit, value, isFaceUp = false, onClick }) => {
    const isRed = suit === "❤️" || suit === "♦️";

    return (
        <div
            onClick={onClick}
            className={`relative w-32 h-44 rounded-lg cursor-pointer transition-transform duration-200 ${!isFaceUp ? "hover:-translate-y-1" : ""
                }`}
        >
            {isFaceUp ? (
                <div className="flex flex-col items-center justify-between w-full h-full p-2 bg-white border border-zinc-200 rounded-lg shadow-sm">
                    <div className={`self-start text-sm font-medium ${isRed ? "text-red-600" : "text-zinc-900"}`}>
                        <div>{value}</div>
                        <div className="text-[10px] leading-none opacity-80">{suit}</div>
                    </div>
                    <div className="text-3xl">{suit}</div>
                    <div className={`self-end text-sm font-medium rotate-180 ${isRed ? "text-red-600" : "text-zinc-900"}`}>
                        <div>{value}</div>
                        <div className="text-[10px] leading-none opacity-80">{suit}</div>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full bg-zinc-50 border border-zinc-200 rounded-lg flex items-center justify-center shadow-sm">
                    <div className="w-24 h-36 border border-zinc-100 rounded-md flex items-center justify-center bg-white opacity-40">
                        <span className="text-xl text-zinc-300">?</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayingCard;

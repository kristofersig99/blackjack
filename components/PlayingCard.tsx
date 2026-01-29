"use client";

import React from "react";

export type Suit = "♠️" | "❤️" | "♣️" | "♦️";
export type Value = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

export interface CardProps {
    suit: Suit;
    value: Value;
    onClick?: () => void;
}

const PlayingCard: React.FC<CardProps> = ({ suit, value, onClick }) => {
    const isRed = suit === "❤️" || suit === "♦️";

    return (
        <div
            onClick={onClick}
            className={`relative w-32 h-44 rounded-lg cursor-pointer`}
        >
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
        </div>
    );
};

export default PlayingCard;

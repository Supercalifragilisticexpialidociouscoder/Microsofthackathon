"use client"

import { useState, useEffect } from "react"
import { CareerCard } from "./career-card"
import { getRecommendations } from "@/lib/mock-ai"
import { useAppStore } from "@/lib/store"
import { Career } from "@/lib/types"

export function SwipeDeck() {
    const [cards, setCards] = useState<Career[]>([])
    const { setView, setSelectedCareer, userProfile } = useAppStore()

    useEffect(() => {
        if (userProfile) {
            // MVP Requirement: Generate results based on the profile
            const recs = getRecommendations(userProfile)
            setCards(recs)
        }
    }, [userProfile])

    const handleSwipe = (id: string, direction: "left" | "right") => {
        const career = cards.find(c => c.id === id)
        setCards((prev) => prev.filter((c) => c.id !== id))

        if (direction === "right" && career) {
            setTimeout(() => {
                setSelectedCareer(career)
                setView('detailed')
            }, 300)
        }
    }

    if (!userProfile) return null // Should not happen

    if (cards.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold">End of Recommendations</h2>
                <p className="text-muted-foreground mt-2 max-w-sm">
                    Based on your education ({userProfile.educationLevel}) and interest in {userProfile.preferredIndustries.join(", ")}, these were the best matches.
                </p>
                <button onClick={() => setView('landing')} className="mt-6 rounded-full bg-primary px-6 py-2 text-white">
                    Start Over
                </button>
            </div>
        )
    }

    const visibleCards = cards.slice(0, 2)

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-4 left-0 w-full text-center z-10">
                <p className="text-sm uppercase tracking-widest text-muted-foreground">Top Recommendations</p>
            </div>

            {visibleCards.map((career, index) => (
                <CareerCard
                    key={career.id}
                    career={career}
                    onSwipe={(dir) => handleSwipe(career.id, dir)}
                    isFront={index === 0}
                />
            )).reverse()}

            <div className="absolute bottom-10 flex gap-6 z-40">
                <button
                    onClick={() => handleSwipe(cards[0].id, "left")}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-card border border-red-500/20 text-red-500 shadow-xl transition-transform hover:scale-110"
                >
                    <span className="sr-only">Pass</span>
                    ✕
                </button>
                <button
                    onClick={() => handleSwipe(cards[0].id, "right")}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 transition-transform hover:scale-110"
                >
                    <span className="sr-only">Like</span>
                    ♥
                </button>
            </div>
        </div>
    )
}

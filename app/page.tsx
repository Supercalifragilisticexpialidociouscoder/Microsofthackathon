"use client"

import { useState } from "react"
import { useAppStore } from "@/lib/store"
import { HeroSection } from "@/components/hero-section"
import { ProfileSummary } from "@/components/profile-summary"
import { SwipeDeck } from "@/components/swipe-deck"
import { DetailedView } from "@/components/detailed-view"
import { extractProfile } from "@/lib/mock-ai"
import { motion, AnimatePresence } from "framer-motion"
import { AssistantOverlay } from "@/components/assistant-overlay"

export default function Home() {
  const { view, setView, setProfile } = useAppStore()

  const handleAnalyze = async (text: string) => {
    setView('analyzing')

    // Simulate AI extraction
    setTimeout(() => {
      const profile = extractProfile(text)
      setProfile(profile)
      setView('summary')
    }, 2000)
  }

  const handleSummaryConfirm = () => {
    setView('discovery')
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-background text-foreground selection:bg-primary/30 overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            className="flex-1 w-full"
          >
            <HeroSection onAnalyze={handleAnalyze} />
          </motion.div>
        )}

        {view === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-screen w-full flex-col items-center justify-center space-y-4"
          >
            <div className="relative h-20 w-20">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/20"></span>
              <span className="absolute inset-0 m-auto h-12 w-12 animate-pulse rounded-full bg-primary shadow-[0_0_40px_rgba(99,102,241,0.6)]"></span>
            </div>
            <p className="animate-pulse text-xl font-medium text-muted-foreground">
              Analyzing your chaotic thoughts...
            </p>
          </motion.div>
        )}

        {view === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex min-h-screen w-full flex-col items-center justify-center py-10"
          >
            <ProfileSummary onConfirm={handleSummaryConfirm} />
          </motion.div>
        )}

        {view === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex-1 w-full"
          >
            <SwipeDeck />
          </motion.div>
        )}

        {view === 'detailed' && (
          <motion.div
            key="detailed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 w-full flex justify-center"
          >
            <DetailedView />
          </motion.div>
        )}
      </AnimatePresence>

      <AssistantOverlay />
    </main>
  )
}

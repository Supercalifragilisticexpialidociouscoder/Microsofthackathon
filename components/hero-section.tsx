"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mic, Send, Sparkles, StopCircle } from "lucide-react"
import { useSpeech } from "@/hooks/use-speech"
import { cn } from "@/lib/utils"

export function HeroSection({ onAnalyze }: { onAnalyze: (text: string) => void }) {
    const [text, setText] = useState("")
    const { isListening, transcript, startListening, stopListening, isSupported, resetTranscript } = useSpeech()

    // Sync transcript to text input
    useEffect(() => {
        if (transcript) {
            setText((prev) => {
                // Simple deduplication strategy or just append if completely new
                // Ideally we just replace if it's a fresh session, but for now we append
                // Actually, let's just use transcript as the source of truth when listening
                const newText = prev + " " + transcript
                resetTranscript() // Clear buffer to avoid dupes
                return newText.trim()
            })
        }
    }, [transcript, resetTranscript])

    const handleSupportCheck = () => {
        if (!isSupported) {
            alert("Voice input is not supported in this browser. Please use Chrome or Edge.")
        }
    }

    const toggleListening = () => {
        if (isListening) {
            stopListening()
        } else {
            handleSupportCheck()
            startListening()
        }
    }

    return (
        <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 text-center">

            {/* Background Decor */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl"
            >
                <div className="mb-6 flex items-center justify-center space-x-2">
                    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <Sparkles className="mr-1 h-3 w-3" />
                        AI-Powered Career Discovery
                    </span>
                </div>

                <h1 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
                    Discover your future, <br />
                    <span className="text-primary">without the forms.</span>
                </h1>

                <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                    Just tell us about yourself. Messy, unstructured, honest. We'll handle the rest.
                </p>

                <div className="mt-10 w-full max-w-2xl">
                    <div className="group relative flex items-center rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="I love solving problems but hate rigid schedules. I'm good at math..."
                            className="flex-1 resize-none bg-transparent px-4 py-3 text-lg text-foreground placeholder-muted-foreground focus:outline-none"
                            rows={3}
                        />

                        <div className="flex flex-col gap-2 px-2">
                            <button
                                onClick={toggleListening}
                                className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-full transition-all",
                                    isListening
                                        ? "animate-pulse bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                        : "bg-white/10 text-white hover:bg-white/20"
                                )}
                                title={isListening ? "Stop Recording" : "Start Recording"}
                            >
                                {isListening ? <StopCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                            </button>

                            <button
                                onClick={() => onAnalyze(text)}
                                disabled={!text.trim()}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Send className="h-5 w-5 ml-0.5" />
                            </button>
                        </div>

                        {/* Listening Indicator Ring */}
                        {isListening && (
                            <span className="absolute -inset-1 -z-10 animate-ping rounded-3xl border border-red-500/30 opacity-75" />
                        )}
                    </div>

                    <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                        <span>Try saying:</span>
                        <button onClick={() => setText("I want a high paying job with low stress.")} className="hover:text-primary transition-colors">"I want high pay & low stress"</button>
                        <span>•</span>
                        <button onClick={() => setText("I'm creative but bad at coding.")} className="hover:text-primary transition-colors">"I'm creative but bad at coding"</button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

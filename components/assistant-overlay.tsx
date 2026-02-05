"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Mic, Volume2 } from "lucide-react"
import { useSpeech } from "@/hooks/use-speech"
import { cn } from "@/lib/utils"

export function AssistantOverlay() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
        { role: 'ai', text: "Hi! I'm your career guide. Ask me anything about these recommendations." }
    ])
    const [input, setInput] = useState("")
    const { isListening, transcript, startListening, stopListening, resetTranscript } = useSpeech()
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (transcript) {
            setInput(transcript)
        }
    }, [transcript])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = () => {
        if (!input.trim()) return

        const userMsg = input
        setMessages(prev => [...prev, { role: 'user', text: userMsg }])
        setInput("")
        resetTranscript()

        // Mock AI response
        setTimeout(() => {
            let response = "That's a great question. Based on your profile, this career offers the best balance of salary and work-life balance."
            if (userMsg.toLowerCase().includes("salary")) {
                response = "Most roles in this field start at around $90k and can scale up to $150k within 3 years."
            } else if (userMsg.toLowerCase().includes("stress")) {
                response = "This role is marked as 'Low Stress' because most work is asynchronous and deadline-flexible."
            }

            setMessages(prev => [...prev, { role: 'ai', text: response }])

            // Auto-speak response (optional, can be toggleable)
            const utterance = new SpeechSynthesisUtterance(response)
            window.speechSynthesis.speak(utterance)

        }, 1000)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 h-[400px] w-[300px] md:w-[350px] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/90 shadow-2xl backdrop-blur-xl"
                    >
                        <div className="flex items-center justify-between border-b border-white/5 bg-primary/10 p-3">
                            <span className="font-semibold text-primary">Career Assistant</span>
                            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-white">
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                                        msg.role === 'user'
                                            ? "ml-auto bg-primary text-white rounded-br-none"
                                            : "mr-auto bg-white/10 text-foreground rounded-bl-none"
                                    )}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-white/5 p-3">
                            <div className="relative flex items-center">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask me anything..."
                                    className="w-full rounded-full bg-white/5 pr-20 pl-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary/50"
                                    autoFocus
                                />
                                <div className="absolute right-1 flex gap-1">
                                    <button
                                        onClick={isListening ? stopListening : startListening}
                                        className={cn("p-1.5 rounded-full hover:bg-white/10 transition-colors", isListening && "text-red-400 animate-pulse")}
                                    >
                                        <Mic className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={handleSend}
                                        className="p-1.5 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30"
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
            </motion.button>
        </div>
    )
}

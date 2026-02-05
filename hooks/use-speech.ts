"use client"

import { useState, useEffect, useCallback } from "react"

interface UseSpeechReturn {
    isListening: boolean
    transcript: string
    startListening: () => void
    stopListening: () => void
    resetTranscript: () => void
    isSupported: boolean
}

export function useSpeech(): UseSpeechReturn {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const [isSupported, setIsSupported] = useState(false)
    const [recognition, setRecognition] = useState<any>(null)

    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).webkitSpeechRecognition) {
            setIsSupported(true)
            const recognitionInstance = new (window as any).webkitSpeechRecognition()
            recognitionInstance.continuous = true
            recognitionInstance.interimResults = true
            recognitionInstance.lang = "en-US"

            recognitionInstance.onresult = (event: any) => {
                let currentTranscript = ""
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    currentTranscript += event.results[i][0].transcript
                }
                setTranscript((prev) => prev + " " + currentTranscript)
            }

            recognitionInstance.onend = () => {
                setIsListening(false)
            }

            setRecognition(recognitionInstance)
        }
    }, [])

    const startListening = useCallback(() => {
        if (recognition && !isListening) {
            try {
                recognition.start()
                setIsListening(true)
            } catch (error) {
                console.error("Speech recognition failed to start:", error)
            }
        }
    }, [recognition, isListening])

    const stopListening = useCallback(() => {
        if (recognition && isListening) {
            recognition.stop()
            setIsListening(false)
        }
    }, [recognition, isListening])

    const resetTranscript = useCallback(() => {
        setTranscript("")
    }, [])

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        resetTranscript,
        isSupported,
    }
}

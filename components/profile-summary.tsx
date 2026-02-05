"use client"

import { motion } from "framer-motion"
import { Check, X, AlertCircle } from "lucide-react"
import { useAppStore, EducationLevel } from "@/lib/store"
import { INDUSTRIES, EDUCATION_LEVELS } from "@/lib/mock-ai"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function ProfileSummary({ onConfirm }: { onConfirm: () => void }) {
    const { userProfile, setProfile } = useAppStore()

    if (!userProfile) return null

    const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProfile({ ...userProfile, educationLevel: e.target.value as EducationLevel })
    }

    const toggleIndustry = (ind: string) => {
        const current = userProfile.preferredIndustries
        const updated = current.includes(ind)
            ? current.filter(i => i !== ind)
            : [...current, ind]
        setProfile({ ...userProfile, preferredIndustries: updated })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl px-6"
        >
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Verify Your Profile
                </h2>
                <p className="text-muted-foreground mt-2">
                    We extracted this from your voice input. Adjust if needed for accurate results.
                </p>
            </div>

            <div className="space-y-6">
                {/* Education Level - Explicit Input */}
                <div className="rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm">
                    <label className="mb-3 block text-sm font-medium text-muted-foreground">Highest Education Level</label>
                    <select
                        value={userProfile.educationLevel}
                        onChange={handleEducationChange}
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                    >
                        {EDUCATION_LEVELS.map(level => (
                            <option key={level} value={level} className="bg-card text-white">
                                {level}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Preferred Industries - Explicit Input */}
                <div className="rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm">
                    <label className="mb-3 block text-sm font-medium text-muted-foreground">Preferred Industries (Select at least 1)</label>
                    <div className="flex flex-wrap gap-2">
                        {INDUSTRIES.map(ind => {
                            const isActive = userProfile.preferredIndustries.includes(ind)
                            return (
                                <button
                                    key={ind}
                                    onClick={() => toggleIndustry(ind)}
                                    className={cn(
                                        "rounded-full px-4 py-2 text-sm transition-all border",
                                        isActive
                                            ? "bg-primary text-white border-primary"
                                            : "bg-transparent text-muted-foreground border-white/10 hover:border-primary/50"
                                    )}
                                >
                                    {ind}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Skills (Read Only / Delete) */}
                <div className="rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm">
                    <h3 className="mb-4 text-sm font-medium text-muted-foreground">Detected Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {userProfile.skills.map(skill => (
                            <span key={skill} className="inline-flex items-center gap-1 rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400 border border-blue-500/20">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                <button
                    onClick={onConfirm}
                    disabled={userProfile.preferredIndustries.length === 0}
                    className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-lg font-medium text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Generate Recommendations
                    <Check className="h-5 w-5" />
                </button>
            </div>
        </motion.div>
    )
}

"use client"

import { Check, X } from "lucide-react"
import { motion } from "framer-motion"

interface SkillGapChartProps {
    required: string[]
    current: string[] // We mock what user has
}

export function SkillGapChart({ required, current }: SkillGapChartProps) {
    return (
        <div className="rounded-2xl bg-card border border-white/10 p-6">
            <h3 className="text-lg font-bold mb-4">Skill Gap Analysis</h3>
            <div className="space-y-3">
                {required.map((skill, i) => {
                    const hasSkill = current.some(c => c.toLowerCase().includes(skill.toLowerCase())) || i % 2 === 0 // Mock overlap
                    return (
                        <div key={skill} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{skill}</span>
                            <div className="flex items-center gap-2">
                                {hasSkill ? (
                                    <span className="flex items-center gap-1 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                                        <Check className="h-3 w-3" /> Match
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded">
                                        <X className="h-3 w-3" /> Missing
                                    </span>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-6">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Match Confidence</span>
                    <span>65%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-primary"
                    />
                </div>
            </div>
        </div>
    )
}

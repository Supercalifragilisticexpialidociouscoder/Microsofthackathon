"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { SkillGapChart } from "./skill-gap-chart"
import { RoadmapTimeline } from "./roadmap-timeline"

export function DetailedView() {
    const { selectedCareer, setView, userProfile } = useAppStore()

    if (!selectedCareer) return null

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl p-6 pb-20"
        >
            <button
                onClick={() => setView('discovery')}
                className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" /> Back to Discovery
            </button>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Header */}
                <div className="md:col-span-2">
                    <h1 className="text-4xl font-bold">{selectedCareer.title}</h1>
                    <p className="text-xl text-primary mt-2">{selectedCareer.salary}</p>
                    <div className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
                        <h3 className="font-bold text-primary mb-1">Our Rationale</h3>
                        <p className="italic text-muted-foreground">"{selectedCareer.rationale}"</p>
                    </div>
                </div>

                {/* Left Column: Stats & Skills */}
                <div className="space-y-6">
                    <SkillGapChart
                        required={selectedCareer.skillsRequired}
                        current={userProfile?.skills || []}
                    />

                    <div className="rounded-2xl border border-white/10 bg-card p-6">
                        <h3 className="font-bold mb-2">Why this fits you</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>High match with your risk tolerance ({userProfile?.riskTolerance})</li>
                            <li>Aligns with your interest in {selectedCareer.industry}</li>
                            <li>Good salary growth potential</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: Roadmap */}
                <div className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm">
                    <RoadmapTimeline />
                </div>
            </div>
        </motion.div>
    )
}

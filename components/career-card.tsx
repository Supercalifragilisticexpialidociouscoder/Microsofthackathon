"use client"

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion"
import { Briefcase, DollarSign, Activity, Star } from "lucide-react"
import { Career } from "@/lib/types"
import { cn } from "@/lib/utils"

interface CareerCardProps {
    career: Career
    onSwipe: (direction: "left" | "right") => void
    isFront: boolean
}

export function CareerCard({ career, onSwipe, isFront }: CareerCardProps) {
    const x = useMotionValue(0)
    const rotate = useTransform(x, [-200, 200], [-15, 15])
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])
    const scale = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9])

    // Overlay colors: Red for Left (Reject), Green for Right (Like)
    const likeOpacity = useTransform(x, [0, 150], [0, 1])
    const nopeOpacity = useTransform(x, [0, -150], [0, 1])

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (Math.abs(info.offset.x) > 100) {
            onSwipe(info.offset.x > 0 ? "right" : "left")
        }
    }

    if (!isFront) {
        return (
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="h-[75vh] w-full max-w-sm scale-95 transform rounded-3xl border border-white/5 bg-card opacity-50 shadow-xl" />
            </div>
        )
    }

    return (
        <div className="absolute inset-0 flex items-center justify-center p-4 z-50">
            <motion.div
                style={{ x, rotate, opacity, scale }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="relative h-[75vh] w-full max-w-sm cursor-grab active:cursor-grabbing"
            >
                {/* Card Content */}
                <div className="h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-card/90 shadow-2xl backdrop-blur-xl transition-colors hover:border-primary/30">

                    {/* Header Gradient */}
                    <div className="h-32 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-6">
                        <div className="flex items-start justify-between">
                            <div className="rounded-full bg-black/20 px-3 py-1 backdrop-blur-md">
                                <span className="text-xs font-bold text-primary">{career.match}% Match</span>
                            </div>
                            <div className="rounded-full bg-white/5 p-2 backdrop-blur-md">
                                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500/20" />
                            </div>
                        </div>
                    </div>

                    <div className="px-6 -mt-10">
                        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-gray-800 to-black shadow-lg flex items-center justify-center border border-white/10">
                            <Briefcase className="h-10 w-10 text-white/80" />
                        </div>
                    </div>

                    <div className="p-6 pt-4">
                        <h2 className="text-3xl font-bold leading-none">{career.title}</h2>

                        {/* MVP Requirement: Rationale */}
                        <div className="mt-3 rounded-lg bg-white/5 p-3 border border-white/5">
                            <p className="text-sm text-primary font-medium mb-1">Why this fits:</p>
                            <p className="text-sm text-muted-foreground italic">"{career.rationale}"</p>
                        </div>

                        <p className="mt-4 text-sm text-gray-400">{career.description}</p>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                                    <DollarSign className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Average Salary</p>
                                    <p className="font-semibold text-white">{career.salary}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-400">
                                    <Activity className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Stress Level</p>
                                    <p className="font-semibold text-white">{career.stress}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {career.tags.map(tag => (
                                <span key={tag} className="rounded-md bg-secondary/50 px-2 py-1 text-xs font-medium text-secondary-foreground border border-white/5">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="absolute bottom-0 w-full p-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                </div>

                {/* Swipe Overlays */}
                <motion.div
                    style={{ opacity: likeOpacity }}
                    className="absolute right-8 top-10 rotate-12 rounded-lg border-4 border-green-500 bg-green-500/20 px-4 py-2 text-3xl font-bold text-green-500 backdrop-blur-sm"
                >
                    INTERESTED
                </motion.div>

                <motion.div
                    style={{ opacity: nopeOpacity }}
                    className="absolute left-8 top-10 -rotate-12 rounded-lg border-4 border-red-500 bg-red-500/20 px-4 py-2 text-3xl font-bold text-red-500 backdrop-blur-sm"
                >
                    PASS
                </motion.div>

            </motion.div>
        </div>
    )
}

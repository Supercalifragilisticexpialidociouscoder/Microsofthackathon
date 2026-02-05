"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle, ArrowRight } from "lucide-react"

export function RoadmapTimeline() {
    const steps = [
        { title: "Learn the Basics", status: "current", desc: "HTML, CSS, JS" },
        { title: "Build Projects", status: "pending", desc: "Portfolio & GitHub" },
        { title: "Get Certified", status: "pending", desc: "AWS or Meta cert" },
        { title: "Apply for Jobs", status: "pending", desc: "Resume & Interviews" },
    ]

    return (
        <div className="w-full space-y-8 p-4">
            <h3 className="text-xl font-bold text-primary">Your Path Forward</h3>
            <div className="relative border-l-2 border-dashed border-white/20 pl-8 ml-4 space-y-10">
                {steps.map((step, idx) => (
                    <div key={idx} className="relative">
                        <span className={`absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-background ${step.status === 'current' ? 'bg-primary' : 'bg-muted'}`}>
                            {step.status === 'completed' ? <CheckCircle2 className="h-4 w-4 text-white" /> : <Circle className="h-3 w-3 text-background" fill="currentColor" />}
                        </span>
                        <div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
                            <h4 className="font-semibold">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.desc}</p>
                        </div>
                        {idx < steps.length - 1 && <ArrowRight className="absolute -bottom-8 left-0 h-4 w-4 text-muted-foreground rotate-90 opacity-20" />}
                    </div>
                ))}
            </div>
        </div>
    )
}

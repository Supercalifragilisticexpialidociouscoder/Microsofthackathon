import { UserProfile, EducationLevel } from "./store"
import { Career } from "./types"

// Enhanced Mock Database
const DATABASE: Career[] = [
    {
        id: "c1",
        title: "Full Stack Developer",
        description: "Building web applications from front to back.",
        match: 0, // Calculated dynamically
        tags: ["High Growth", "Remote"],
        salary: "$120k - $180k",
        stress: "Medium",
        skillsRequired: ["Coding", "System Design", "Problem Solving"],
        lifestyle: "Continuous learning, flexible hours.",
        rationale: "",
        industry: "Technology",
        minEducation: "Self-Taught"
    },
    {
        id: "c2",
        title: "Product Manager",
        description: "Leading cross-functional teams to build products.",
        match: 0,
        tags: ["Leadership", "Strategic"],
        salary: "$130k - $190k",
        stress: "High",
        skillsRequired: ["Leadership", "Communication", "Data Analysis"],
        lifestyle: "Meeting-heavy, high impact.",
        rationale: "",
        industry: "Technology",
        minEducation: "Bachelor"
    },
    {
        id: "c3",
        title: "Financial Analyst",
        description: "Guiding investment decisions with market data.",
        match: 0,
        tags: ["Finance", "Analytical"],
        salary: "$90k - $140k",
        stress: "Medium-High",
        skillsRequired: ["Data Analysis", "Math", "Excel"],
        lifestyle: "Corporate environment, detail-oriented.",
        rationale: "",
        industry: "Finance",
        minEducation: "Bachelor"
    },
    {
        id: "c4",
        title: "Digital Marketer",
        description: "Driving brand growth through online channels.",
        match: 0,
        tags: ["Creative", "Marketing"],
        salary: "$70k - $120k",
        stress: "Medium",
        skillsRequired: ["Creativity", "Communication", "Social Media"],
        lifestyle: "Fast-paced, creative.",
        rationale: "",
        industry: "Marketing",
        minEducation: "High School"
    },
    {
        id: "c5",
        title: "Nurse Practitioner",
        description: "Providing advanced patient care.",
        match: 0,
        tags: ["Healthcare", "Helping People"],
        salary: "$110k - $150k",
        stress: "High",
        skillsRequired: ["Empathy", "Biology", "Communication"],
        lifestyle: "Shift work, emotional rewards.",
        rationale: "",
        industry: "Healthcare",
        minEducation: "Master"
    }
]

export const INDUSTRIES = ["Technology", "Finance", "Healthcare", "Marketing", "Art & Design", "Education"]
export const EDUCATION_LEVELS: EducationLevel[] = ["High School", "Self-Taught", "Bachelor", "Master", "PhD"]

export function extractProfile(text: string): UserProfile {
    const lower = text.toLowerCase()

    // Basic Keyword Extraction
    const skills = []
    if (lower.includes("code") || lower.includes("tech")) skills.push("Coding")
    if (lower.includes("lead") || lower.includes("manager")) skills.push("Leadership")
    if (lower.includes("talk") || lower.includes("social")) skills.push("Communication")
    if (lower.includes("math") || lower.includes("data")) skills.push("Data Analysis")
    if (skills.length === 0) skills.push("Problem Solving") // Default

    // Industry Inference
    const industries = []
    if (lower.includes("tech") || lower.includes("app")) industries.push("Technology")
    if (lower.includes("money") || lower.includes("bank")) industries.push("Finance")
    if (lower.includes("health") || lower.includes("doctor")) industries.push("Healthcare")
    if (industries.length === 0) industries.push("Technology") // Default Fallback

    // Education Inference
    let edu: EducationLevel = 'Bachelor' // Default assumption
    if (lower.includes("degree")) edu = 'Bachelor'
    if (lower.includes("phd") || lower.includes("doctorate")) edu = 'PhD'
    if (lower.includes("self") || lower.includes("bootcamp")) edu = 'Self-Taught'

    return {
        rawInput: text,
        skills,
        interests: ["Growth", "Stability"], // simplifying
        traits: ["Adaptable"],
        riskTolerance: lower.includes("safe") ? 'Low' : 'Medium',
        educationLevel: edu,
        preferredIndustries: industries
    }
}

// Logic-Based Recommendation Engine
export function getRecommendations(profile: UserProfile): Career[] {
    return DATABASE.map(career => {
        let score = 50 // Base score

        // 1. Industry Match (+30)
        if (profile.preferredIndustries.includes(career.industry)) {
            score += 30
        }

        // 2. Skill Match (+20)
        const skillMatch = career.skillsRequired.filter(s => profile.skills.includes(s)).length
        score += (skillMatch * 10)

        // 3. Education Check (Penalty if underqualified)
        const eduRank = EDUCATION_LEVELS.indexOf(profile.educationLevel)
        const reqRank = EDUCATION_LEVELS.indexOf(career.minEducation as EducationLevel)
        if (eduRank < reqRank) {
            score -= 30 // Significant penalty
        }

        // Generate Rational based on rules
        let rationale = `Matches your skills in ${career.skillsRequired[0]}.`
        if (profile.preferredIndustries.includes(career.industry)) {
            rationale = `Strong fit for your interest in ${career.industry}. ` + rationale
        }
        if (eduRank < reqRank) {
            rationale = `Ambitious goal. Requires more education than your current ${profile.educationLevel}.`
        }

        return { ...career, match: Math.min(100, Math.max(0, score)), rationale }
    }).sort((a, b) => b.match - a.match) // Sort by best match
}

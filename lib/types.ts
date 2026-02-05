export interface Career {
    id: string
    title: string
    description: string
    match: number
    tags: string[]
    salary: string
    stress: string
    skillsRequired: string[]
    lifestyle: string
    rationale: string // New MVP requirement
    industry: string
    minEducation: string
}

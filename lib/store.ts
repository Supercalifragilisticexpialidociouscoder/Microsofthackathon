import { create } from 'zustand'
import { Career } from './types'

export type EducationLevel = 'High School' | 'Bachelor' | 'Master' | 'PhD' | 'Self-Taught'

export interface UserProfile {
    rawInput: string
    skills: string[]
    interests: string[]
    traits: string[]
    riskTolerance: 'Low' | 'Medium' | 'High'
    educationLevel: EducationLevel
    preferredIndustries: string[]
}

interface AppState {
    view: 'landing' | 'analyzing' | 'summary' | 'discovery' | 'detailed'
    userProfile: UserProfile | null
    selectedCareer: Career | null
    setInput: (text: string) => void
    setProfile: (profile: UserProfile) => void
    setSelectedCareer: (career: Career | null) => void
    setView: (view: AppState['view']) => void
}

export const useAppStore = create<AppState>((set) => ({
    view: 'landing',
    userProfile: null,
    selectedCareer: null,
    setInput: (text) => set((state) => ({
        userProfile: { ...state.userProfile, rawInput: text } as UserProfile
    })),
    setProfile: (profile) => set({ userProfile: profile }),
    setSelectedCareer: (career) => set({ selectedCareer: career }),
    setView: (view) => set({ view }),
}))

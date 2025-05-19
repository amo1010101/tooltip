// Example architecture file showing the separation of concerns

// 1. Core Business Logic (Platform-agnostic)
export interface LifePillar {
  id: string
  name: string
  value: number
  color: string
}

export interface UserAction {
  id: string
  type: "photo" | "voice" | "feeling"
  timestamp: number
  pillarId: string
  value?: number
  mediaUrl?: string
  notes?: string
}

// These interfaces and functions can be shared between Next.js and React Native
export function calculateLifeBalance(pillars: LifePillar[]): number {
  return Math.round(pillars.reduce((sum, pillar) => sum + pillar.value, 0) / pillars.length)
}

// 2. Data Services (Can be shared with minimal changes)
export class UserDataService {
  // Methods that interact with APIs, storage, etc.
  // Implementation details may differ between platforms, but interface remains the same
  async getUserPillars(): Promise<LifePillar[]> {
    // In web: fetch from API or localStorage
    // In React Native: fetch from API or AsyncStorage
    return [] // Placeholder
  }

  async saveUserAction(action: UserAction): Promise<void> {
    // Implementation details
  }
}

// 3. UI Components (Platform-specific)
// These will need to be reimplemented in React Native
// But the props and behavior can remain consistent

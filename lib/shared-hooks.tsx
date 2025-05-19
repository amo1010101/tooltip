"use client"

// Example of shared hooks that can work in both Next.js and React Native

import { useState, useEffect } from "react"
import { type LifePillar, UserDataService } from "./architecture"

// This hook can be used in both Next.js and React Native
export function useLifePillars() {
  const [pillars, setPillars] = useState<LifePillar[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const dataService = new UserDataService()

    async function loadPillars() {
      try {
        setLoading(true)
        const data = await dataService.getUserPillars()
        setPillars(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setLoading(false)
      }
    }

    loadPillars()
  }, [])

  return { pillars, loading, error }
}

// More shared hooks for actions, diagnostics, learning, etc.

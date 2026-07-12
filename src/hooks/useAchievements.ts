import { createContext, useContext } from 'react'
import { site } from '../data/site'

export type AchievementId = keyof typeof site.achievements

export type AchievementControls = {
  /** Show the achievement toast for `id` (once per session). */
  unlock: (id: AchievementId) => void
}

export const AchievementsContext = createContext<AchievementControls | null>(null)

export function useAchievements(): AchievementControls {
  const ctx = useContext(AchievementsContext)
  if (!ctx) throw new Error('useAchievements must be used within <AchievementsProvider>')
  return ctx
}

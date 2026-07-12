import { useEffect } from 'react'
import ExperienceCard from '../components/ExperienceCard'
import PagePanel from '../components/PagePanel'
import { site } from '../data/site'
import { useAchievements } from '../hooks/useAchievements'

export default function Experience() {
  const { unlock } = useAchievements()

  useEffect(() => {
    unlock('experience')
  }, [unlock])

  return (
    <PagePanel title="EXPERIENCE LOG">
      <div className="flex min-h-full flex-col p-5 sm:p-6">
        <p className="font-pixel text-sm tracking-[0.05em] text-mc-muted">
          Hover over a card for the full rundown.
        </p>
        <div className="mt-5 grid flex-1 gap-5 md:auto-rows-fr md:grid-cols-2">
          {site.experience.map((entry) => (
            <ExperienceCard key={entry.org} entry={entry} />
          ))}
        </div>
      </div>
    </PagePanel>
  )
}

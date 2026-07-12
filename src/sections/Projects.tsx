import { useEffect } from 'react'
import PagePanel from '../components/PagePanel'
import ProjectCard from '../components/ProjectCard'
import { site } from '../data/site'
import { useAchievements } from '../hooks/useAchievements'

export default function Projects() {
  const { unlock } = useAchievements()

  useEffect(() => {
    unlock('projects')
  }, [unlock])

  return (
    <PagePanel title="PROJECTS">
      <div className="flex flex-col gap-6 p-5 sm:p-7">
        {site.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </PagePanel>
  )
}

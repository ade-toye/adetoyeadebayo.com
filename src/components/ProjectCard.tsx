type Project = {
  title: string
  icon: string
  dates: string
  tags: readonly string[]
  bullets: readonly string[]
  accent: string
}

/**
 * Full-width stacked project card: icon + title with right-aligned dates,
 * tag chips bordered/colored in the card's accent, then arrow-marked bullets.
 */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="relative border-2 border-[#3f3f46] bg-[#17171b] p-6 sm:p-7">
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1"
        style={{ backgroundColor: project.accent }}
      />
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="text-lg text-white sm:text-xl">
          <span aria-hidden="true" className="mr-3">
            {project.icon}
          </span>
          {project.title}
        </h2>
        <p className="font-pixel text-sm text-mc-muted">{project.dates}</p>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="border-2 px-2.5 py-1 font-pixel text-[12px]"
            style={{ borderColor: project.accent, color: project.accent }}
          >
            {tag}
          </li>
        ))}
      </ul>
      <ul className="mt-5 flex flex-col gap-4">
        {project.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 font-pixel text-sm leading-[1.8] text-mc-text">
            <span aria-hidden="true" className="mt-0.5" style={{ color: project.accent }}>
              ▸
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

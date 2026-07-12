type SkillChipsProps = {
  skills: readonly string[]
}

/** Chip grid for the skill inventory. Empty list renders the TBD placeholder
    until the content pass supplies real entries. */
export default function SkillChips({ skills }: SkillChipsProps) {
  if (skills.length === 0) return <p className="text-mc-muted">TBD</p>
  return (
    <ul className="flex flex-wrap gap-2.5">
      {skills.map((skill) => (
        <li
          key={skill}
          className="border-2 border-[#55555c] bg-[#2b2b30] px-3 py-1.5 font-pixel text-xs tracking-[0.05em] text-mc-text"
        >
          {skill}
        </li>
      ))}
    </ul>
  )
}

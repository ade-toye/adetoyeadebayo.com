import { useEffect } from 'react'
import LinkedInButton from '../components/LinkedInButton'
import PagePanel from '../components/PagePanel'
import PhotoCarousel from '../components/PhotoCarousel'
import ResumeDropdown from '../components/ResumeDropdown'
import SkillChips from '../components/SkillChips'
import { site } from '../data/site'
import { useAchievements } from '../hooks/useAchievements'

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="font-pixel text-sm tracking-[0.12em] text-yellow-400">
      {'// '}
      {children}
    </h2>
  )
}

export default function About() {
  const { unlock } = useAchievements()

  useEffect(() => {
    unlock('about')
  }, [unlock])

  return (
    <PagePanel title="ABOUT ME">
      <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,42fr)_minmax(0,50fr)] lg:gap-12">
        <PhotoCarousel slides={site.about.photos} altBase={site.name} />
        <div className="flex flex-col gap-8">
          <section>
            <SectionLabel>PLAYER INFO</SectionLabel>
            <p className="mt-4 font-pixel text-2xl text-white">{site.name}</p>
            <p className="mt-4 max-w-prose font-pixel text-sm leading-[1.8] text-mc-text">
              {site.about.bio}
            </p>
          </section>
          <section>
            <SectionLabel>EDUCATION</SectionLabel>
            <p className="mt-3 font-pixel text-lg text-white">{site.about.education.school}</p>
            <p className="mt-2 font-pixel text-sm text-mc-muted">{site.about.education.detail}</p>
          </section>
          <section>
            <SectionLabel>INTERESTS</SectionLabel>
            <p className="mt-3 max-w-prose font-pixel text-sm leading-[1.8] text-mc-text">
              {site.about.interests || 'TBD'}
            </p>
          </section>
          <section>
            <SectionLabel>SKILL INVENTORY</SectionLabel>
            <div className="mt-4">
              <SkillChips skills={site.about.skills} />
            </div>
          </section>
          <div className="mt-auto pt-3">
            <ResumeDropdown />
            {/* Below md the CharacterWidget (and its LinkedIn button) is hidden,
                so LinkedIn relocates directly beneath View Resume. */}
            <LinkedInButton className="mt-3 md:hidden" />
          </div>
        </div>
      </div>
    </PagePanel>
  )
}

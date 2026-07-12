import LinkedInButton from '../components/LinkedInButton'
import PagePanel from '../components/PagePanel'
import ResumeDropdown from '../components/ResumeDropdown'
import { site } from '../data/site'
import { useAudio } from '../hooks/useAudio'

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="font-pixel text-sm tracking-[0.12em] text-yellow-400">
      {'// '}
      {children}
    </h2>
  )
}

export default function Contact() {
  const { playClick } = useAudio()
  return (
    <PagePanel title="CONTACT">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-9 p-5 sm:p-8">
        <section>
          <SectionLabel>EMAIL</SectionLabel>
          <a
            href={`mailto:${site.contact.email}`}
            onClick={() => playClick()}
            className="mt-3 inline-block font-pixel text-base text-mc-text underline decoration-mc-accent underline-offset-4 hover:text-white"
          >
            {site.contact.email}
          </a>
        </section>
        <section>
          <SectionLabel>RESUME</SectionLabel>
          <div className="mt-4">
            <ResumeDropdown />
          </div>
        </section>
        <section>
          <SectionLabel>LINKS</SectionLabel>
          <div className="mt-4 flex flex-col gap-3">
            <LinkedInButton />
            <a
              href={site.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="mc-button-light flex items-center justify-center gap-2 px-5 py-2.5 font-pixel text-sm text-white [text-shadow:0.09em_0.09em_0_rgba(0,0,0,0.45)]"
            >
              GitHub
            </a>
          </div>
        </section>
      </div>
    </PagePanel>
  )
}

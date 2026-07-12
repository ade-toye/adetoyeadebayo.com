import { Link } from 'react-router-dom'
import { navItems } from '../data/site'
import { useAudio } from '../hooks/useAudio'

export default function Navbar() {
  const { playClick } = useAudio()
  return (
    <nav aria-label="Main" className="w-full max-w-[38.5rem]">
      <ul className="flex w-full flex-col gap-[21px]">
        {navItems.map((item) => {
          const className =
            'mc-button-light block px-6 py-[18px] font-pixel text-[21px] leading-none tracking-[0.08em] text-white [text-shadow:0.09em_0.09em_0_rgba(0,0,0,0.45)]'
          return (
            <li key={item.label}>
              {'to' in item ? (
                <Link to={item.to} onClick={() => playClick()} className={className}>
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  className={className}
                >
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

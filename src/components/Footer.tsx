import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between px-4 py-2 text-xs text-mc-muted">
      <span>
        © {new Date().getFullYear()} {site.name}
      </span>
      <span>{site.version}</span>
    </footer>
  )
}

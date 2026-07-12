import BackgroundVideo from '../components/BackgroundVideo'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10 px-4">
      <BackgroundVideo />
      <Hero />
      <Navbar />
    </div>
  )
}

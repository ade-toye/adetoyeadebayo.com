import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AchievementsProvider from './components/AchievementsProvider'
import AudioProvider from './components/AudioProvider'
import AudioUnlockHint from './components/AudioUnlockHint'
import CharacterWidget from './components/CharacterWidget'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import Settings from './components/Settings'
import Home from './sections/Home'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

// The loading screen shows for at least this long, even if the scene is ready sooner.
const LOADING_MIN_MS = 5000
// Separate failure safety net: recovers from a load that never settles (broken WebGL,
// hung request). Not a display-timing knob — keep it independent of LOADING_MIN_MS.
const LOADING_FAILSAFE_MS = 10000

function App() {
  const [sceneReady, setSceneReady] = useState(false)
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)
  const [failsafeTripped, setFailsafeTripped] = useState(false)

  useEffect(() => {
    const minTimer = setTimeout(() => setMinTimeElapsed(true), LOADING_MIN_MS)
    const failsafeTimer = setTimeout(() => setFailsafeTripped(true), LOADING_FAILSAFE_MS)
    return () => {
      clearTimeout(minTimer)
      clearTimeout(failsafeTimer)
    }
  }, [])

  const ready = (sceneReady && minTimeElapsed) || failsafeTripped

  return (
    <AudioProvider>
      <AchievementsProvider ready={ready}>
        <LoadingScreen hidden={ready} />
      <main className="min-h-svh pb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
        <Settings />
        <AudioUnlockHint ready={ready} />
        <CharacterWidget onReady={() => setSceneReady(true)} />
        <Footer />
      </AchievementsProvider>
    </AudioProvider>
  )
}

export default App

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PortalTransition from './components/PortalTransition.jsx'
import Home from './pages/Home.jsx'
import Gallery from './pages/Gallery.jsx'
import SpiderDetail from './pages/SpiderDetail.jsx'
import spiders from './data/spiders.json'

function ScrollManager() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }) }, [location.pathname])
  return null
}

function PageRoutes({ onJump }) {
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
        transition={{ duration: reducedMotion ? 0 : 0.28, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home onJump={onJump} />} />
          <Route path="/gallery" element={<Gallery onJump={onJump} />} />
          <Route path="/spider/:id" element={<SpiderDetail onJump={onJump} />} />
          <Route path="*" element={<div className="not-found"><span>404 // UNKNOWN DIMENSION</span><h1>You slipped off the web.</h1><a href="/gallery" className="button-primary">Find your way back ↗</a></div>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [jumpTarget, setJumpTarget] = useState(null)
  const navigate = useNavigate()
  const target = spiders.find((spider) => spider.id === jumpTarget)

  const onJump = (id) => {
    if (jumpTarget) return
    setJumpTarget(id)
    window.setTimeout(() => {
      navigate(`/spider/${id}`)
      window.setTimeout(() => setJumpTarget(null), 250)
    }, 520)
  }

  return (
    <>
      <ScrollManager />
      <Navbar />
      <PageRoutes onJump={onJump} />
      <Footer />
      <PortalTransition active={Boolean(jumpTarget)} characterName={target?.name} />
    </>
  )
}

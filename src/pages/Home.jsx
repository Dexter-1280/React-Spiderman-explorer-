import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, Orbit, Scan, Zap } from 'lucide-react'
import SpiderWebCanvas from '../components/SpiderWebCanvas.jsx'
import CharacterCard from '../components/CharacterCard.jsx'
import spiders from '../data/spiders.json'

export default function Home({ onJump }) {
  const reducedMotion = useReducedMotion()
  const featured = [spiders[0], spiders.find((spider) => spider.id === 'spider-man-india'), spiders.find((spider) => spider.id === 'spdr-peni-parker')]

  return (
    <main>
      <section className="hero-section">
        <SpiderWebCanvas className="hero-web" />
        <div className="hero-noise" />
        <div className="hero-shell">
          <motion.div className="hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="eyebrow"><span className="eyebrow-dot" /> MULTIVERSE ACCESS // GRANTED</div>
            <h1>EVERY<br /><span>UNIVERSE</span><br />HAS A <em>SPIDER.</em></h1>
            <p className="hero-lede">{spiders.length} variants. Countless different stories. One thread connects them all. Step through the portal and meet the Spider-People of the omniverse.</p>
            <div className="hero-actions">
              <Link to="/gallery" className="button-primary">Enter the Spider-Society <ArrowRight size={17} /></Link>
              <a href="#featured" className="button-quiet">Meet the variants <ArrowDown size={15} /></a>
            </div>
            <div className="hero-meta"><span><i /> {spiders.length} KNOWN SPIDER-TOTEMS</span><span>EST. ACROSS INFINITE REALITIES</span></div>
          </motion.div>
          <motion.div className="hero-art" initial={reducedMotion ? false : { opacity: 0, scale: 0.84, x: 45 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>
            <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
            <div className="hero-art-glow" />
            <img
              src={spiders[0].image}
              data-fallback={spiders[0].imageFallback}
              referrerPolicy="no-referrer"
              alt="Spider-Man comic artwork"
              onError={(event) => { const image = event.currentTarget; const fallback = image.dataset.fallback; const fallbackUrl = fallback ? new URL(fallback, window.location.href).href : ''; if (fallback && image.src !== fallbackUrl) image.src = fallback; else image.classList.add('image-failed') }}
            />
            <div className="hero-coordinate"><span>EARTH-616</span><strong>ORIGIN POINT</strong><i>40°42' N / 74°00' W</i></div>
            <div className="hero-side-note">WEB OF LIFE<br />& DESTINY</div>
          </motion.div>
        </div>
        <div className="hero-bottom-line"><span>SCROLL TO EXPLORE</span><span className="line" /><span>01 / 03</span></div>
      </section>

      <section className="manifesto-section">
        <div className="manifesto-shell">
          <div className="manifesto-label"><span>01</span> THE MULTIVERSE RULE</div>
          <div className="manifesto-copy"><h2>Different faces.<br /><span>Same instinct.</span></h2><p>Every universe tells the Spider story differently. Some heroes were bitten. Some were built. Some are not even human. But when the city needs them, they show up.</p></div>
          <div className="manifesto-stamp"><Orbit size={38} strokeWidth={1.1} /><span>INFINITE<br />POSSIBILITIES</span></div>
        </div>
      </section>

      <section className="featured-section" id="featured">
        <div className="section-heading">
          <div><div className="eyebrow"><span className="eyebrow-dot" /> FIRST CONTACT</div><h2>THE ONES TO <em>KNOW.</em></h2></div>
          <Link to="/gallery" className="text-link">View all variants <ArrowRight size={16} /></Link>
        </div>
        <div className="featured-grid">
          {featured.map((spider, index) => <CharacterCard key={spider.id} spider={spider} index={index} onJump={onJump} />)}
        </div>
      </section>

      <section className="signal-section">
        <div className="signal-grid">
          <div className="signal-mark"><Scan size={28} /><span>WEB<br />SIGNAL</span></div>
          <div><div className="eyebrow">YOUR NEXT STOP</div><h2>THE WEB IS<br /><em>WAITING.</em></h2></div>
          <div className="signal-copy"><p>Find your universe. Learn their story. Pick your Spider-Person.</p><Link to="/gallery" className="button-primary">Explore all {spiders.length} <Zap size={16} /></Link></div>
        </div>
      </section>
    </main>
  )
}

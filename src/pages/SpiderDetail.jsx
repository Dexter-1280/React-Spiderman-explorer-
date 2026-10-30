import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Dna, Globe2, Shield, Sparkles } from 'lucide-react'
import CharacterCard from '../components/CharacterCard.jsx'
import spiders from '../data/spiders.json'

export default function SpiderDetail({ onJump }) {
  const { id } = useParams()
  const spider = spiders.find((item) => item.id === id)
  const reducedMotion = useReducedMotion()

  if (!spider) {
    return <main className="not-found"><span>404 // LOST IN THE WEB</span><h1>Wrong dimension.</h1><Link to="/gallery" className="button-primary">Back to the Spider-Society <ArrowRight size={16} /></Link></main>
  }

  const related = spiders.filter((item) => item.id !== spider.id).slice(0, 3)

  return (
    <main className="detail-page" style={{ '--detail-accent': spider.accent }}>
      <div className="detail-topline"><Link to="/gallery"><ArrowLeft size={15} /> BACK TO DIRECTORY</Link><span>PROFILE FILE // {spider.number}</span></div>
      <section className="detail-hero">
        <div className="detail-hero-art">
          <div className="detail-art-grid" />
          <div className="detail-art-glow" />
          <div className="detail-orbit detail-orbit-a" /><div className="detail-orbit detail-orbit-b" />
          <motion.img
            src={spider.image}
            data-fallback={spider.imageFallback}
            style={{ objectPosition: spider.imagePosition || 'center center' }}
            referrerPolicy="no-referrer"
            alt={`${spider.name} comic artwork`}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.84, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onError={(event) => { const image = event.currentTarget; const fallback = image.dataset.fallback; const fallbackUrl = fallback ? new URL(fallback, window.location.href).href : ''; if (fallback && image.src !== fallbackUrl) image.src = fallback; else image.classList.add('image-failed') }}
          />
          <span className="detail-vertical-label">{spider.universe} / MULTIVERSE ARCHIVE</span>
        </div>
        <motion.div className="detail-copy" initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }}>
          <div className="eyebrow"><span className="eyebrow-dot" /> {spider.status}</div>
          <div className="detail-number">VARIANT {spider.number}</div>
          <h1>{spider.name.split(' ').map((word, index) => <span key={word} className={index === spider.name.split(' ').length - 1 ? 'last-word' : ''}>{word} </span>)}</h1>
          <p className="detail-real-name">IDENTITY // {spider.realName}</p>
          <p className="detail-real-name">CLASSIFICATION // {spider.variantType || 'Classic'}</p>
          <p className="detail-tagline">“{spider.tagline}”</p>
          <p className="detail-description">{spider.description}</p>
          <div className="detail-actions"><span className="universe-pill"><Globe2 size={14} /> {spider.universe}</span></div>
        </motion.div>
      </section>

      <section className="detail-data-section">
        <div className="data-heading"><span>FIELD REPORT / CAPABILITIES</span><span>01 — 03</span></div>
        <div className="data-panel">
          <div className="data-panel-heading"><div className="data-icon"><Dna size={19} /></div><div><span>POWER SET</span><small>Known abilities & skills</small></div></div>
          <div className="power-list">{spider.powers.map((power, index) => <motion.div key={power} className="power-chip" initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}><span>0{index + 1}</span>{power}</motion.div>)}</div>
        </div>
        <div className="data-panel data-panel-secondary"><div className="data-panel-heading"><div className="data-icon"><Shield size={19} /></div><div><span>DIMENSIONAL PROFILE</span><small>Coordinates from the Spider-Verse archive</small></div></div><div className="dimension-stats"><div><small>UNIVERSE</small><strong>{spider.universe}</strong></div><div><small>KNOWN AS</small><strong>{spider.name}</strong></div><div><small>REAL IDENTITY</small><strong>{spider.realName}</strong></div></div></div>
      </section>

      <section className="related-section">
        <div className="section-heading"><div><div className="eyebrow"><Sparkles size={13} /> CONNECTIONS DETECTED</div><h2>OTHER THREADS<br /><em>IN THE WEB.</em></h2></div><Link to="/gallery" className="text-link">Full directory <ArrowRight size={16} /></Link></div>
        <div className="featured-grid">{related.map((item, index) => <CharacterCard key={item.id} spider={item} index={index} onJump={onJump} />)}</div>
      </section>
    </main>
  )
}

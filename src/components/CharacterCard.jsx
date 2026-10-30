import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Zap } from 'lucide-react'

export default function CharacterCard({ spider, index = 0, onJump }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.button
      type="button"
      className="character-card"
      style={{ '--card-accent': spider.accent }}
      onClick={() => onJump(spider.id)}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, delay: reducedMotion ? 0 : (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reducedMotion ? undefined : { y: -7, rotateX: 2, rotateY: -2 }}
      whileTap={{ scale: 0.985 }}
    >
      <div className="card-image-wrap">
        <img
          className="card-image"
          style={{ objectPosition: spider.imagePosition || 'center 25%' }}
          src={spider.image}
          data-fallback={spider.imageFallback}
          alt={`${spider.name} official or comic artwork`}
          title={spider.imageCredit || `${spider.name} artwork`}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          onError={(event) => {
            const image = event.currentTarget
            const fallback = image.dataset.fallback
            const fallbackUrl = fallback ? new URL(fallback, window.location.href).href : ''
            if (fallback && image.src !== fallbackUrl) image.src = fallback
            else image.classList.add('image-failed')
          }}
        />
        <div className="card-image-shade" />
        <span className="card-index">{spider.number}</span>
        <span className="card-open"><ArrowUpRight size={17} /></span>
        <span className="card-status"><Zap size={11} /> {spider.status}</span>
      </div>
      <div className="card-info">
        <div className="card-universe">{spider.universe} · {spider.variantType || 'Classic'}</div>
        <h3>{spider.name}</h3>
        <p>{spider.realName}</p>
      </div>
    </motion.button>
  )
}

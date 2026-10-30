import { AnimatePresence, motion } from 'framer-motion'

export default function PortalTransition({ active, characterName }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div className="portal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="portal-ring portal-ring-outer" initial={{ scale: 0.1, rotate: -35 }} animate={{ scale: 1.35, rotate: 80 }} transition={{ duration: 0.72, ease: 'easeOut' }} />
          <motion.div className="portal-ring portal-ring-inner" initial={{ scale: 0.05 }} animate={{ scale: 1.1 }} transition={{ duration: 0.62, ease: 'easeOut' }} />
          <motion.div className="portal-core" initial={{ scale: 0.01, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.38 }} />
          <motion.div className="portal-caption" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.18 }}>
            <span>DIMENSIONAL BREACH DETECTED</span>
            <strong>JUMPING TO {characterName || 'NEW UNIVERSE'}</strong>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

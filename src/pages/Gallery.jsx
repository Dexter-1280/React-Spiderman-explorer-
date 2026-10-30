import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownUp, Filter, Search, SlidersHorizontal, Layers3 } from 'lucide-react'
import CharacterCard from '../components/CharacterCard.jsx'
import SpiderWebCanvas from '../components/SpiderWebCanvas.jsx'
import spiders from '../data/spiders.json'

const variantTypes = [...new Set(spiders.map((spider) => spider.variantType || 'Classic'))].sort()
const universes = [...new Set(spiders.map((spider) => spider.universe))].sort()
const totalLabel = String(spiders.length).padStart(3, '0')

export default function Gallery({ onJump }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const reducedMotion = useReducedMotion()
  const selectedUniverse = searchParams.get('universe') || 'all'
  const selectedType = searchParams.get('type') || 'all'
  const sortOrder = searchParams.get('sort') || 'az'
  const searchTerm = searchParams.get('q') || ''

  const updateParam = (key, value, defaultValue) => {
    const next = new URLSearchParams(searchParams)
    if (!value || value === defaultValue) next.delete(key)
    else next.set(key, value)
    setSearchParams(next, { replace: true })
  }

  const visibleSpiders = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase()
    return spiders
      .filter((spider) => selectedUniverse === 'all' || spider.universe === selectedUniverse)
      .filter((spider) => selectedType === 'all' || (spider.variantType || 'Classic') === selectedType)
      .filter((spider) => !normalized || `${spider.name} ${spider.realName} ${spider.universe} ${spider.variantType || 'Classic'} ${spider.status} ${spider.powers.join(' ')} ${spider.description}`.toLowerCase().includes(normalized))
      .sort((a, b) => {
        if (sortOrder === 'za') return b.name.localeCompare(a.name)
        if (sortOrder === 'newest') return b.number.localeCompare(a.number)
        return a.name.localeCompare(b.name)
      })
  }, [selectedUniverse, selectedType, sortOrder, searchTerm])

  const activeCoordinates = `?universe=${selectedUniverse === 'all' ? 'all' : encodeURIComponent(selectedUniverse)}&type=${selectedType === 'all' ? 'all' : encodeURIComponent(selectedType)}&sort=${sortOrder}${searchTerm ? `&q=${encodeURIComponent(searchTerm)}` : ''}`

  return (
    <main className="gallery-page">
      <section className="gallery-hero">
        <SpiderWebCanvas className="gallery-web" />
        <div className="gallery-hero-shell">
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="eyebrow"><span className="eyebrow-dot" /> MULTIVERSE DIRECTORY / 001—{totalLabel}</div>
            <h1>MEET THE<br /><em>SPIDER-SOCIETY.</em></h1>
            <p>Explore {spiders.length} Spider-People from across the multiverse. From web-slinging legends to cosmic, digital and mechanical variants, every universe has its own story.</p>
          </motion.div>
          <div className="gallery-hero-count"><strong>{spiders.length}</strong><span>ACTIVE<br />PROFILES</span></div>
        </div>
      </section>

      <section className="directory-section">
        <div className="directory-toolbar">
          <div className="directory-title"><span className="toolbar-icon"><Filter size={15} /></span><div><span>DIRECTORY</span><small>{visibleSpiders.length} of {spiders.length} spider-totems</small></div></div>
          <div className="filters-group">
            <label className="filter-control search-control"><Search size={15} /><input value={searchTerm} onChange={(event) => updateParam('q', event.target.value, '')} placeholder="Search name, power or universe" aria-label="Search Spider-People" /></label>
            <label className="filter-control"><SlidersHorizontal size={15} /><select value={selectedUniverse} onChange={(event) => updateParam('universe', event.target.value, 'all')} aria-label="Filter by universe"><option value="all">All universes</option>{universes.map((universe) => <option key={universe} value={universe}>{universe}</option>)}</select></label>
            <label className="filter-control"><Layers3 size={15} /><select value={selectedType} onChange={(event) => updateParam('type', event.target.value, 'all')} aria-label="Filter by variant type"><option value="all">All variants</option>{variantTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
            <label className="filter-control sort-control"><ArrowDownUp size={15} /><select value={sortOrder} onChange={(event) => updateParam('sort', event.target.value, 'az')} aria-label="Sort Spider-People"><option value="az">Name: A—Z</option><option value="za">Name: Z—A</option><option value="newest">Recently added</option></select></label>
          </div>
        </div>
        <div className="active-filter-row"><span>ACTIVE COORDINATES</span><code>{activeCoordinates}</code><button onClick={() => setSearchParams({})}>Reset filters ↺</button></div>
        {visibleSpiders.length ? (
          <div className="directory-grid">
            {visibleSpiders.map((spider, index) => <CharacterCard key={spider.id} spider={spider} index={index} onJump={onJump} />)}
          </div>
        ) : (
          <div className="empty-state"><span>NO SIGNAL</span><h3>No Spider-People found.</h3><p>Try a different name, ability, variant type or universe coordinate.</p><button className="button-primary" onClick={() => setSearchParams({})}>Reset directory</button></div>
        )}
      </section>
    </main>
  )
}

import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link to="/" className="brand" onClick={close} aria-label="Spider-Verse Explorer home">
          <span className="brand-mark"><span /></span>
          <span className="brand-copy">SPIDER<span>VERSE</span><small>EXPLORER</small></span>
        </Link>
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/gallery" onClick={close}>The Spider-Society</NavLink>
        </nav>
        <Link to="/gallery" className="nav-cta">Explore the web <span>↗</span></Link>
      </div>
    </header>
  )
}

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function SpiderWebCanvas({ className = '' }) {
  const canvasRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let frame = 0
    let raf = 0
    let pointerX = 0
    let pointerY = 0
    let targetX = 0
    let targetY = 0
    let scroll = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(0)
    }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      targetX = (event.clientX - rect.left) / Math.max(1, rect.width) - 0.5
      targetY = (event.clientY - rect.top) / Math.max(1, rect.height) - 0.5
    }

    const onScroll = () => { scroll = window.scrollY || 0 }

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height)
      const cx = width * 0.68 + pointerX * 38
      const cy = height * 0.48 + pointerY * 30 + Math.sin(time * 0.00035) * 8
      const radius = Math.min(width, height) * 0.59
      const gradient = ctx.createRadialGradient(cx, cy, 4, cx, cy, radius)
      gradient.addColorStop(0, 'rgba(240, 75, 66, 0.16)')
      gradient.addColorStop(0.48, 'rgba(145, 69, 176, 0.07)')
      gradient.addColorStop(1, 'rgba(8, 9, 13, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(-0.13 + Math.sin(time * 0.00015) * 0.025)
      ctx.strokeStyle = 'rgba(210, 218, 232, 0.19)'
      ctx.lineWidth = 0.7
      const rays = 18
      const rings = 10
      for (let ray = 0; ray < rays; ray += 1) {
        const angle = (Math.PI * 2 * ray) / rays
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius)
        ctx.stroke()
      }
      for (let ring = 1; ring <= rings; ring += 1) {
        const r = (radius / rings) * ring
        ctx.beginPath()
        for (let ray = 0; ray <= rays; ray += 1) {
          const angle = (Math.PI * 2 * ray) / rays
          const bend = Math.sin(angle * 3 + ring * 0.44 + time * 0.0002) * 5
          const x = Math.cos(angle) * (r + bend)
          const y = Math.sin(angle) * (r + bend)
          if (ray === 0) ctx.moveTo(x, y)
          else ctx.quadraticCurveTo(x * 0.99, y * 0.99, x, y)
        }
        ctx.closePath()
        ctx.stroke()
      }
      ctx.restore()

      const dotCount = Math.min(42, Math.floor(width / 24))
      for (let i = 0; i < dotCount; i += 1) {
        const x = ((i * 97 + time * (0.006 + (i % 3) * 0.002) + scroll * 0.08) % (width + 40)) - 20
        const y = ((i * 53 + Math.sin(time * 0.0005 + i) * 24) % (height + 30)) - 15
        ctx.beginPath()
        ctx.fillStyle = i % 4 === 0 ? 'rgba(240,75,66,0.7)' : 'rgba(221,226,238,0.42)'
        ctx.arc(x, y, i % 4 === 0 ? 1.7 : 1, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const animate = (time) => {
      pointerX += (targetX - pointerX) * 0.045
      pointerY += (targetY - pointerY) * 0.045
      draw(time)
      frame += 1
      raf = window.requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    canvas.addEventListener('pointermove', onPointerMove)
    if (!reducedMotion) raf = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      canvas.removeEventListener('pointermove', onPointerMove)
    }
  }, [reducedMotion])

  return <canvas ref={canvasRef} className={`web-canvas ${className}`} aria-hidden="true" />
}

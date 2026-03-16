'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  px: number
  py: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleOffset: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const COUNT = 220

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function createStars() {
      const stars: Star[] = []
      for (let i = 0; i < COUNT; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          z: Math.random(),
          px: 0,
          py: 0,
          size: Math.random() * 1.8 + 0.2,
          opacity: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
        })
      }
      starsRef.current = stars
    }

    function draw(time: number) {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const cx = canvas.width / 2
      const cy = canvas.height / 2

      for (const star of starsRef.current) {
        // Parallax offset based on depth (z) and mouse position
        const parallax = star.z * 18
        const ox = ((mx - cx) / cx) * parallax
        const oy = ((my - cy) / cy) * parallax

        // Slow drift
        star.y += star.z * 0.08
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        const twinkle =
          Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7
        const alpha = star.opacity * twinkle

        const screenX = star.x + ox
        const screenY = star.y + oy

        // Draw star with subtle glow for brighter ones
        if (star.size > 1.2) {
          const grd = ctx.createRadialGradient(
            screenX, screenY, 0,
            screenX, screenY, star.size * 3
          )
          grd.addColorStop(0, `rgba(180, 220, 255, ${alpha})`)
          grd.addColorStop(1, `rgba(100, 160, 255, 0)`)
          ctx.beginPath()
          ctx.arc(screenX, screenY, star.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(screenX, screenY, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 230, 255, ${alpha})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resize()
    createStars()
    rafRef.current = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  )
}

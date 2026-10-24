import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useSpring } from 'framer-motion'
import { nav, profile } from './data/site.js'
import Hero from './sections/Hero.jsx'
import Opening from './sections/Opening.jsx'
import Profile from './sections/Profile.jsx'
import Work from './sections/Work.jsx'
import Capabilities from './sections/Capabilities.jsx'
import Contact from './sections/Contact.jsx'
import DotField from './components/DotField.jsx'
import GooeyNav from './components/GooeyNav.jsx'

const navItems = nav.map((item) => ({ label: item.label, href: item.href }))
const navIds = nav.map((item) => item.href.slice(1))

export default function App() {
  const lenisRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [activeNav, setActiveNav] = useState(0)
  // 点击后 1.5s 内不让滚动监听改写高亮，避免平滑滚动途中药丸来回跳
  const navLock = useRef(0)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.3 })

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    lenisRef.current = lenis

    let frame = 0
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // 滚动位置 → 当前段落高亮
  useEffect(() => {
    let timer = 0
    const measure = () => {
      if (performance.now() < navLock.current) return
      const line = window.innerHeight * 0.35
      let index = 0
      navIds.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) index = i
      })
      setActiveNav(index)
    }
    // 一个 scroll 监听同时管「导航毛玻璃」和「分段高亮」，
    // 高亮防抖 140ms：一次快速滚动里连着换会让药丸动画被打断、留下残影
    const onScroll = () => {
      const next = window.scrollY > 40
      setScrolled((prev) => (prev === next ? prev : next))
      window.clearTimeout(timer)
      timer = window.setTimeout(measure, 140)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // 站内锚点统一交给 Lenis，保证和滚轮同样的手感
  const handleAnchor = (e) => {
    const a = e.target.closest?.('a[href^="#"]')
    if (!a) return
    const href = a.getAttribute('href')
    if (!href || href === '#') return
    const el = document.querySelector(href)
    if (!el) return
    e.preventDefault()
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0, duration: 1.4 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div onClick={handleAnchor}>
      <div className="dot-bg" aria-hidden="true">
        <DotField
          gradientFrom="#5227FF"
          gradientTo="#FF9FFC"
          dotRadius={1.5}
          dotSpacing={14}
          // 全屏点阵是低频图案，2x 渲染肉眼无收益；1.5x 少画 44% 的像素
          maxDevicePixelRatio={1.5}
          cursorRadius={240}
          bulgeStrength={0.6}
          glowRadius={160}
        />
      </div>

      <motion.div className="nav__bar" style={{ scaleX: progress }} aria-hidden="true" />

      <header className="nav" data-scrolled={scrolled}>
        <a className="nav__mark" href="#top">
          {profile.name}
          <span>{profile.latin}</span>
        </a>

        <div className="nav__gooey">
          <GooeyNav
            items={navItems}
            activeIndex={activeNav}
            onChange={(index) => {
              setActiveNav(index)
              navLock.current = performance.now() + 1500
            }}
            theme="dark"
            size="sm"
            frame
            particleCount={15}
            spread={56}
            animationTime={600}
            timeVariance={300}
            gooeyness={0.5}
            wobble={0.5}
            hoverEffect
            color="#c8a7ff"
            colors={['#c8a7ff', '#e4d4ff', '#8b6bc4']}
          />
        </div>

        <a className="btn btn--solid nav__cta" href="#contact">
          联系我
        </a>
      </header>

      <main>
        <Hero />
        <Opening />
        <Profile />
        <Work />
        <Capabilities />
        <Contact />
      </main>
    </div>
  )
}

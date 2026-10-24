import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import CircularGallery from '../components/CircularGallery.jsx'
import Reveal from '../components/Reveal.jsx'
import ProximityText from '../components/ProximityText.jsx'
import { researchFeature } from '../data/site.js'

const pad = (n) => String(n).padStart(2, '0')

const pages = Array.from({ length: researchFeature.pageCount }, (_, i) => ({
  image: `./assets/research/page-${pad(i + 1)}.webp`,
  text: `P${pad(i + 1)}`,
}))

export default function ResearchFeature() {
  const [open, setOpen] = useState(-1)
  // 8 张页面图共 ~0.9MB，全部是 WebGL 纹理。画廊原本在首屏就建场景、拉图，
  // 这里等它离视口 600px 内再挂载；没 WebGL / 观察器不可用时退化为直接挂载。
  const stageRef = useRef(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '600px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const close = useCallback(() => setOpen(-1), [])
  const step = useCallback(
    (dir) => setOpen((i) => (i < 0 ? i : (i + dir + pages.length) % pages.length)),
    []
  )

  useEffect(() => {
    if (open < 0) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, close, step])

  return (
    <article className="feature">
      <div className="feature__head">
        <Reveal className="feature__intro">
          <div className="feature__label">
            <span>{researchFeature.no}</span>
            <span>{researchFeature.en}</span>
          </div>
          <ProximityText as="h3" className="feature__title">{researchFeature.cn}</ProximityText>
          <p className="feature__latin">{researchFeature.latin}</p>
          <p className="feature__desc">{researchFeature.desc}</p>

          <div className="feature__metrics">
            {researchFeature.metrics.map((m) => (
              <div key={m.k}>
                <div className="metric__v">{m.v}</div>
                <div className="metric__k">{m.k}</div>
              </div>
            ))}
          </div>

          <p className="feature__hint">
            拖动或滚动翻页 · 点击任意一页放大阅读
          </p>
        </Reveal>

        <Reveal className="feature__stage" delay={0.08}>
          <div className="feature__stage-inner" ref={stageRef}>
            {near ? (
              <CircularGallery
                items={pages}
                bend={1.9}
                textColor="#ffffff"
                borderRadius={0.05}
                scrollEase={0.05}
                itemAspect={0.707}
                gap={0.16}
                itemSize={1.18}
                font={'700 24px "Inter Tight", sans-serif'}
                showTitles={false}
                openOnClick={false}
                snap
                onItemClick={(item, index) => setOpen(index)}
              />
            ) : (
              <div className="feature__stage-pending" aria-hidden="true">
                <span>01 — {pad(pages.length)}</span>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {open >= 0 ? createPortal(
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="科研手册页面">
          <button className="lightbox__close" onClick={close} aria-label="关闭">
            ✕
          </button>
          <button className="lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="上一页">
            ‹
          </button>
          <img className="lightbox__img" src={pages[open].image} alt={`科研手册第 ${open + 1} 页`} />
          <button className="lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="下一页">
            ›
          </button>
          <p className="lightbox__count">
            {pad(open + 1)} / {pad(pages.length)}
          </p>
          <div className="lightbox__backdrop" onClick={close} />
        </div>,
        document.body
      ) : null}
    </article>
  )
}

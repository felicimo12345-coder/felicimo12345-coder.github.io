import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * CardSwap —— 磨砂玻璃质感的卡片堆：正面一张完整卡片，后面的卡片向上错位露出标题条。
 *
 *   <CardSwap items={[{ title, image, meta }]} delay={4600}
 *     verticalDistance={33} depth={90} visibleCards={4} onCardClick={(item, i) => ...} />
 *
 * 高度 = 堆叠露出部分 + 单张卡片高度，由容器宽度实时换算（卡片按 aspect 比例），
 * 不需要外部传 width / height。
 *
 * 三种翻页方式：
 *   1. 自动（delay 间隔，悬停暂停，滚出视口 / 后台标签页也暂停）
 *   2. 滚轮：指针停在卡片上滚动，一格一页（36ms 锁，避免触控板一次滑动连翻）
 *   3. 拖拽：按住左键上下拉动，过 56px 松手即翻页
 *
 * 注意：根节点带 `data-lenis-prevent-wheel`。站点用 Lenis 接管滚轮，
 * 它在 window 上收同一次事件，不声明的话会「翻页 + 页面一起滚」。
 */

const PAD = 8 // 玻璃外框内边距
const HEAD = 34 // 标题条高度
const GAP = 4 // 标题条与图片之间

const WHEEL_STEP = 42 // 滚轮累计多少像素触发一次翻页
const WHEEL_LOCK = 380 // 两次滚轮翻页之间的最小间隔（ms）
const DRAG_STEP = 56 // 拖动多少像素触发翻页
const DRAG_DAMP = 0.6 // 拖动阻尼（视觉位移 = 实际位移 × 该系数）
const LEAVE_MS = 520 // 顶层卡片飞出动画时长

export default function CardSwap({
  items = [],
  delay = 4600,
  verticalDistance = 33,
  depth = 90,
  visibleCards = 4,
  aspect = 2.832,
  onCardClick,
  className = '',
}) {
  const rootRef = useRef(null)
  const [width, setWidth] = useState(0)
  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [dragDy, setDragDy] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [paused, setPaused] = useState(false)

  const timer = useRef(0)
  const busy = useRef(false) // 翻页动画进行中
  const wheelAcc = useRef(0)
  const wheelLock = useRef(0)
  const drag = useRef(null) // { id, y, dy, active }
  const suppressClick = useRef(false)

  const count = items.length
  const visible = Math.min(count, visibleCards)

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return undefined
    const measure = () => setWidth(el.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const mediaH = width ? (width - PAD * 2) / aspect : 0
  const cardH = mediaH ? PAD + HEAD + GAP + mediaH + PAD : 0
  const peek = (visible - 1) * verticalDistance

  /* ── 翻页（自动 / 滚轮 / 拖拽 / 键盘共用一条通道） ── */
  const step = useCallback(
    (dir) => {
      if (count < 2 || busy.current) return
      busy.current = true
      setLeaving(true)
      clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        setIndex((i) => (i + dir + count) % count)
        setLeaving(false)
        busy.current = false
      }, LEAVE_MS)
    },
    [count]
  )

  useEffect(() => {
    if (count < 2 || paused) return undefined
    const id = setInterval(() => step(1), delay)
    return () => clearInterval(id)
  }, [count, delay, paused, step])

  useEffect(() => {
    setIndex(0)
  }, [count])

  useEffect(
    () => () => {
      clearTimeout(timer.current)
    },
    []
  )

  /* ── 滚轮翻页 ──
   * React 的 onWheel 在根容器上是 passive 的，preventDefault 无效，
   * 所以必须手动挂 { passive: false }。
   */
  useEffect(() => {
    const el = rootRef.current
    if (!el || count < 2) return undefined

    const onWheel = (e) => {
      if (e.ctrlKey) return // 触控板捏合缩放不拦
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return // 横向手势让给页面
      e.preventDefault()

      const now = performance.now()
      if (now < wheelLock.current) return

      // deltaMode: 0 像素 / 1 行 / 2 页
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientWidth : 1
      wheelAcc.current += e.deltaY * unit
      if (Math.abs(wheelAcc.current) < WHEEL_STEP) return

      const dir = wheelAcc.current > 0 ? 1 : -1
      wheelAcc.current = 0
      wheelLock.current = now + WHEEL_LOCK
      step(dir)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [count, step])

  /* ── 按下左键上下拖动翻页 ── */
  useEffect(() => {
    const el = rootRef.current
    if (!el || count < 2) return undefined

    const onDown = (e) => {
      if (e.button !== 0 || e.pointerType === 'touch') return
      const front = e.target.closest?.('.cs__slot[data-front="true"]')
      if (!front || !el.contains(front)) return
      drag.current = { id: e.pointerId, y: e.clientY, dy: 0, active: false }
    }

    const onMove = (e) => {
      const d = drag.current
      if (!d || d.id !== e.pointerId) return
      const dy = e.clientY - d.y
      d.dy = dy
      if (!d.active && Math.abs(dy) > 5) {
        d.active = true
        setDragging(true)
        el.setPointerCapture?.(e.pointerId)
      }
      if (!d.active) return
      // 阻尼 + 限幅，别让卡片被拖出画面
      const damped = dy * DRAG_DAMP
      const limit = cardH ? cardH * 0.55 : 200
      setDragDy(Math.max(-limit, Math.min(limit, damped)))
    }

    const finish = (e) => {
      const d = drag.current
      if (!d || d.id !== e.pointerId) return
      drag.current = null
      el.releasePointerCapture?.(e.pointerId)
      setDragDy(0)
      setDragging(false)
      if (!d.active) return
      // 拖过了就别再触发 click（否则一拖就把灯箱打开）
      suppressClick.current = true
      window.setTimeout(() => {
        suppressClick.current = false
      }, 320)
      if (Math.abs(d.dy) >= DRAG_STEP) {
        // 往上拖 = 内容上移 = 下一页；往下拖 = 上一页
        step(d.dy < 0 ? 1 : -1)
      }
    }

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', finish)
    el.addEventListener('pointercancel', finish)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', finish)
      el.removeEventListener('pointercancel', finish)
    }
  }, [cardH, count, step])

  /* ── 指针离开时清掉滚轮累计，避免下次进来被半格带翻 ── */
  const onLeave = () => {
    setPaused(false)
    wheelAcc.current = 0
    wheelLock.current = 0
  }

  return (
    <div
      ref={rootRef}
      className={`cs ${className}`.trim()}
      style={{ height: cardH ? `${peek + cardH}px` : undefined }}
      data-dragging={dragging ? 'true' : 'false'}
      data-lenis-prevent-wheel=""
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="项目页面（滚轮或按住拖动可翻页）"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={onLeave}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault()
          step(1)
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault()
          step(-1)
        }
      }}
    >
      <div className="cs__deck" style={{ '--cs-peek': `${peek}px` }}>
        {items.map((item, i) => {
          const d = (i - index + count) % count
          if (d >= visible) return null
          const front = d === 0
          const out = front && leaving
          // 均匀露出：绕底边缩放后再补位移，保证每层露出的高度一致
          const s = 1 - d * (depth / 1600)
          const dy = -(d * verticalDistance) - cardH * (1 - s)

          return (
            <button
              key={item.image}
              type="button"
              className="cs__slot"
              data-front={front ? 'true' : 'false'}
              style={{
                height: `${cardH}px`,
                zIndex: 30 - d,
                opacity: out ? 0 : 1 - d * 0.06,
                transform: out
                  ? `translate3d(0, ${cardH * 0.5}px, 0) scale(0.94)`
                  : `translate3d(0, ${dy + (front ? dragDy : 0)}px, 0) scale(${s})`,
                // 拖动时去掉过渡，卡片才能 1:1 跟手
                transition: front && (dragging || dragDy) ? 'none' : undefined,
              }}
              onClick={() => {
                if (suppressClick.current) {
                  suppressClick.current = false
                  return
                }
                if (front) {
                  if (onCardClick) onCardClick(item, index)
                  else step(1)
                } else {
                  step(d)
                }
              }}
              tabIndex={front ? 0 : -1}
              aria-hidden={!front}
            >
              <span className="cs__tile">
                <span className="cs__head">
                  <span className="cs__no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cs__title">{item.title}</span>
                  <span className="cs__meta">{item.meta}</span>
                </span>
                <span className="cs__media">
                  <img
                    src={item.image}
                    alt={item.title || ''}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

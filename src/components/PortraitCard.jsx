import { Suspense, lazy, useEffect, useRef, useState } from 'react'

/**
 * PortraitCard —— 个人简介左侧的「挂牌」。
 *
 * Lanyard（React Bits）基于 three.js，体积约 520KB，所以：
 *   1. 用 React.lazy 拆成独立 chunk，不进首屏 bundle；
 *   2. 用 IntersectionObserver 等到这一屏快进入视口，再等滚动空闲（requestIdleCallback，
 *      最多 1.8s）才挂载——three.js 建场景 + 编译着色器是一次 ~1s 的主线程阻塞，
 *      放在滚动过程中会明显卡手。在此之前显示同一张卡的静态照片。
 *   3. 挂载 1.5s 后若 canvas 仍未出现（WebGL 不可用），退回静态照片，
 *      不让这一栏直接空掉。
 */
const Lanyard = lazy(() => import('./Lanyard.jsx'))

export default function PortraitCard() {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true)
      return undefined
    }
    let idleId = 0
    let timerId = 0
    const mount = () => setShow(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        if (typeof window.requestIdleCallback === 'function') {
          idleId = window.requestIdleCallback(mount, { timeout: 1800 })
        } else {
          timerId = window.setTimeout(mount, 400)
        }
      },
      { rootMargin: '320px 0px' }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (idleId) window.cancelIdleCallback?.(idleId)
      if (timerId) window.clearTimeout(timerId)
    }
  }, [])

  useEffect(() => {
    if (!show) return undefined
    const id = window.setTimeout(() => {
      if (!ref.current?.querySelector('.lanyard__canvas')) setFailed(true)
    }, 1500)
    return () => clearTimeout(id)
  }, [show])

  const still = (
    <img
      className="lanyard-stage__still"
      src="./assets/lanyard-front.webp"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable="false"
    />
  )

  return (
    <div className="lanyard-stage" ref={ref} role="img" aria-label="张哲的肖像，做成一枚挂在挂带上的工牌">
      {show && !failed ? (
        <Suspense fallback={still}>
          <Lanyard
            frontImage="./assets/lanyard-front.webp"
            cardColor="#14111c"
            strapColor="#7c3aed"
            orientation="portrait"
            finish="glossy"
            size={0.74}
            anchor="center"
            strapLength={0.34}
            strapWidth={0.62}
            metal="silver"
            gravity={1}
            damping={0.62}
            elasticity={0.5}
            breeze={0.22}
          />
        </Suspense>
      ) : (
        still
      )}
    </div>
  )
}

import { createContext, useCallback, useContext, useRef } from 'react'

/**
 * MagicBento —— 卡片网格 + 跟随鼠标的边框光 / 聚光 / 点击波纹 / 3D 倾斜 / 磁吸。
 * 保留原组件的参数签名（columns / rowHeight / gap / radius /
 * enableBorderGlow / enableSpotlight / spotlightRadius / clickEffect /
 * enableTilt / enableMagnetism），重写成不依赖 Tailwind 与图标库的版本，卡片内容由 children 决定。
 *
 * 交互全部走 CSS 变量，避免每帧 setState：
 *   --mx / --my   指针位置（边框光与聚光）
 *   --rx / --ry   倾斜角度
 *   --tx / --ty   磁吸位移
 */
const BentoCtx = createContext({
  enableBorderGlow: true,
  enableSpotlight: true,
  spotlightRadius: 300,
  clickEffect: true,
  enableTilt: false,
  enableMagnetism: false,
  tiltMax: 5,
  magnetMax: 7,
})

const RESET = { '--rx': '0deg', '--ry': '0deg', '--tx': '0px', '--ty': '0px' }

export function BentoCard({ children, className = '', style, ...rest }) {
  const cfg = useContext(BentoCtx)
  const ref = useRef(null)
  const fxRef = useRef(null)

  const handleMove = useCallback(
    (e) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)

      if (cfg.enableTilt || cfg.enableMagnetism) {
        // -1 ~ 1，以卡片中心为原点
        const px = (x / Math.max(1, r.width) - 0.5) * 2
        const py = (y / Math.max(1, r.height) - 0.5) * 2
        if (cfg.enableTilt) {
          el.style.setProperty('--ry', `${(px * cfg.tiltMax).toFixed(2)}deg`)
          el.style.setProperty('--rx', `${(-py * cfg.tiltMax).toFixed(2)}deg`)
        }
        if (cfg.enableMagnetism) {
          el.style.setProperty('--tx', `${(px * cfg.magnetMax).toFixed(2)}px`)
          el.style.setProperty('--ty', `${(py * cfg.magnetMax).toFixed(2)}px`)
        }
      }

      if (el.dataset.hover !== 'true') el.dataset.hover = 'true'
    },
    [cfg.enableTilt, cfg.enableMagnetism, cfg.tiltMax, cfg.magnetMax]
  )

  const handleLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.dataset.hover = 'false'
    // 离开时把倾斜与磁吸复位，留下一点回弹
    for (const [k, v] of Object.entries(RESET)) el.style.setProperty(k, v)
  }, [])

  const handleDown = useCallback(
    (e) => {
      if (!cfg.clickEffect || !fxRef.current) return
      const r = ref.current.getBoundingClientRect()
      const dot = document.createElement('span')
      dot.className = 'bento__ripple'
      dot.style.left = `${e.clientX - r.left}px`
      dot.style.top = `${e.clientY - r.top}px`
      fxRef.current.appendChild(dot)
      window.setTimeout(() => dot.remove(), 760)
    },
    [cfg.clickEffect]
  )

  return (
    <div
      ref={ref}
      className={`bento__card ${className}`.trim()}
      style={style}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onPointerDown={handleDown}
      {...rest}
    >
      <span className="bento__spot" aria-hidden="true" />
      <div className="bento__inner">{children}</div>
      <span className="bento__fx" ref={fxRef} aria-hidden="true" />
    </div>
  )
}

export default function MagicBento({
  columns = 4,
  rowHeight = 200,
  gap = 12,
  radius = 20,
  enableBorderGlow = true,
  enableSpotlight = true,
  spotlightRadius = 300,
  clickEffect = true,
  enableTilt = false,
  enableMagnetism = false,
  tiltMax = 5,
  magnetMax = 7,
  className = '',
  children,
}) {
  return (
    <div
      className={[
        'bento',
        enableBorderGlow ? 'bento--glow' : '',
        enableSpotlight ? 'bento--spot' : '',
        enableTilt ? 'bento--tilt' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        '--mb-cols': columns,
        '--mb-gap': `${gap}px`,
        '--mb-radius': `${radius}px`,
        '--mb-row': `${rowHeight}px`,
        '--mb-spot': `${spotlightRadius}px`,
        '--mb-tilt': `${tiltMax}deg`,
        '--mb-magnet': `${magnetMax}px`,
      }}
    >
      <BentoCtx.Provider
        value={{
          enableBorderGlow,
          enableSpotlight,
          spotlightRadius,
          clickEffect,
          enableTilt,
          enableMagnetism,
          tiltMax,
          magnetMax,
        }}
      >
        {children}
      </BentoCtx.Provider>
    </div>
  )
}

import { useEffect, useRef } from 'react'

/**
 * ProximityText —— 光标靠近时逐字变化的文字。
 *
 * 拉丁文走真实的可变字重（Inter Tight Variable 的 wght 轴）；
 * 中文用的普惠体是静态字重、没有 wght 轴，所以改用「靠近发亮」的柔光，
 * 效果同源但不会假装能做到字重插值。
 *
 * 性能：全局只挂一个 pointermove + 一个 rAF；只有在光标进入元素外扩 radius 的
 * 范围时才逐字计算，字符位置在进入时缓存一次，不做逐帧布局读取。
 */

const instances = new Set()
let raf = 0
let pointerX = -99999
let pointerY = -99999

const tick = () => {
  raf = 0
  instances.forEach((inst) => inst.update(pointerX, pointerY))
}

const onMove = (e) => {
  pointerX = e.clientX
  pointerY = e.clientY
  if (!raf) raf = requestAnimationFrame(tick)
}

if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', onMove, { passive: true })
}

const isCJK = (s) => /[\u3400-\u9fff\uf900-\ufaff]/.test(s)

export default function ProximityText({
  children,
  className = '',
  radius = 140,
  weightLift = 280,
  glow = 0.8,
  as: Tag = 'span',
  ...rest
}) {
  const ref = useRef(null)
  const text = typeof children === 'string' ? children : ''

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const nodes = Array.from(el.querySelectorAll('[data-c]'))
    if (!nodes.length) return undefined

    const inst = {
      active: false,
      offsets: null,
      update(cx, cy) {
        const r = el.getBoundingClientRect()
        const near =
          cx > r.left - radius &&
          cx < r.right + radius &&
          cy > r.top - radius &&
          cy < r.bottom + radius

        if (!near) {
          if (this.active) {
            this.active = false
            this.offsets = null
            nodes.forEach((n) => {
              n.style.fontVariationSettings = ''
              n.style.textShadow = ''
            })
          }
          return
        }

        if (!this.offsets) {
          this.offsets = nodes.map((n) => {
            const b = n.getBoundingClientRect()
            return {
              x: b.left - r.left + b.width / 2,
              y: b.top - r.top + b.height / 2,
              base: parseFloat(getComputedStyle(n).fontWeight) || 400,
              cjk: n.dataset.cjk === '1',
              // 已经是 700 以上的字重，wght 轴没有上抬空间了，改用柔光
              glowOnly: n.dataset.cjk === '1' || (parseFloat(getComputedStyle(n).fontWeight) || 400) >= 700,
            }
          })
        }
        this.active = true

        const localX = cx - r.left
        const localY = cy - r.top

        for (let i = 0; i < nodes.length; i += 1) {
          const o = this.offsets[i]
          const d = Math.hypot(localX - o.x, localY - o.y)
          const t = d >= radius ? 0 : 1 - d / radius
          const node = nodes[i]

          if (o.glowOnly) {
            if (t <= 0.01) {
              node.style.fontVariationSettings = ''
              node.style.textShadow = ''
            } else {
              const a = glow * t * t
              node.style.textShadow = `0 0 ${(18 * t).toFixed(1)}px rgba(214, 184, 255, ${a.toFixed(3)})`
            }
          } else if (t <= 0.01) {
            node.style.fontVariationSettings = ''
          } else {
            const w = Math.round(o.base + weightLift * t * t)
            node.style.fontVariationSettings = `'wght' ${Math.min(1000, w)}`
          }
        }
      },
    }

    instances.add(inst)
    return () => {
      instances.delete(inst)
      nodes.forEach((n) => {
        n.style.fontVariationSettings = ''
        n.style.textShadow = ''
      })
    }
  }, [radius, weightLift, glow, text])

  if (!text) return <Tag className={className} {...rest}>{children}</Tag>

  // 按空格切成词，词内逐字；中文整串就是一个「词」，逐字内联块可按字换行
  const words = text.split(/(\s+)/)

  return (
    <Tag ref={ref} className={className} aria-label={text} {...rest}>
      {words.map((word, wi) => {
        if (!word) return null
        if (/^\s+$/.test(word)) return <span key={`s${wi}`}> </span>
        return (
          <span key={`w${wi}`} style={{ display: 'inline-block', whiteSpace: 'nowrap' }} aria-hidden="true">
            {Array.from(word).map((ch, ci) => (
              <span key={ci} data-c="" data-cjk={isCJK(ch) ? '1' : '0'} style={{ display: 'inline-block' }}>
                {ch}
              </span>
            ))}
          </span>
        )
      })}
    </Tag>
  )
}

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

/**
 * Lightbox —— 全屏看图，支持 ← / → 翻页、Esc 关闭、点遮罩关闭。
 * 用 portal 挂到 body：否则会被 main 的层叠上下文困住，被导航盖住。
 */
export default function Lightbox({ images, index, onClose, onStep, label = '作品集页面' }) {
  const open = index >= 0 && index < images.length

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose, onStep])

  if (!open) return null

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={label}>
      <div className="lightbox__backdrop" onClick={onClose} />
      <img className="lightbox__img" src={images[index]} alt={`${label} ${index + 1}`} />
      <button className="lightbox__close" onClick={onClose} aria-label="关闭">
        ✕
      </button>
      {images.length > 1 ? (
        <>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => onStep(-1)}
            aria-label="上一页"
          >
            ‹
          </button>
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={() => onStep(1)}
            aria-label="下一页"
          >
            ›
          </button>
        </>
      ) : null}
      <p className="lightbox__count">
        {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </p>
    </div>,
    document.body
  )
}

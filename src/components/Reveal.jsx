import { motion, useReducedMotion } from 'framer-motion'

/**
 * 滚动入场：进入视口时轻微上移 + 淡入。只播一次。
 * 尊重系统的“减少动态效果”设置。
 */
export default function Reveal({ children, as = 'div', y = 26, delay = 0, className, style }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div

  return (
    <Tag
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}

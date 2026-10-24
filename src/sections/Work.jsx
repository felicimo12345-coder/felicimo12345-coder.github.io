import Reveal from '../components/Reveal.jsx'
import CardSwap from '../components/CardSwap.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { useCallback, useState } from 'react'
import ProximityText from '../components/ProximityText.jsx'
import { projects } from '../data/site.js'
import ResearchFeature from './ResearchFeature.jsx'
import Others from './Others.jsx'
import SpecularButton from '../components/SpecularButton.jsx'

function ProjectCard({ p }) {
  const pages = p.pages?.length ? p.pages : [p.cover]
  const [open, setOpen] = useState(-1)

  const step = useCallback(
    (dir) => setOpen((i) => (i < 0 ? i : (i + dir + pages.length) % pages.length)),
    [pages.length]
  )
  const close = useCallback(() => setOpen(-1), [])

  const media = (
    <div className="card__media">
      <CardSwap
        items={pages.map((src, i) => ({
          image: src,
          title: `${p.title} · P${String(i + 1).padStart(2, '0')}`,
        }))}
        delay={4600}
        verticalDistance={30}
        depth={90}
        visibleCards={4}
        onCardClick={(_item, i) => setOpen(i)}
      />
      <Lightbox
        images={pages}
        index={open}
        onClose={close}
        onStep={step}
        label={`${p.title} 作品集页面`}
      />
    </div>
  )

  return (
    <Reveal className="card" style={{ '--project': p.accent }}>
      {media}

      <div className="card__body">
        <div className="card__top">
          <span className="card__no">{p.no}</span>
          <span className="card__dot" aria-hidden="true" />
          <ProximityText className="card__kicker">{p.kicker}</ProximityText>
        </div>

        <ProximityText as="h3" className="card__title">{p.title}</ProximityText>
        <ProximityText as="p" className="card__cn">{p.cn}</ProximityText>
        <p className="card__teaser">{p.teaser}</p>

        <div className="card__meta">
          <span>{p.period}</span>
          <span>{p.role}</span>
          {p.meta.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>

        <div className="card__metrics">
          {p.metrics.map((m) => (
            <div key={m.k}>
              <div className="metric__v">{m.v}</div>
              <div className="metric__k">{m.k}</div>
            </div>
          ))}
        </div>

        <p className="card__note">{p.note}</p>

        {p.href ? (
          <div className="card__cta">
            <SpecularButton
              href={p.href}
              size="lg"
              radius={16}
              tint="#ffffff"
              tintOpacity={0.05}
              blur={12}
              textColor="#f4f1fa"
              lineColor="#ffffff"
              baseColor="#2c2e49"
              intensity={1}
              idleIntensity={0.5}
              shineSize={10}
              shineFade={34}
              thickness={1.2}
              glow={1.15}
              followMouse
              proximity={250}
            >
              打开在线 Demo
              <span aria-hidden="true">↗</span>
            </SpecularButton>
            <span className="card__cta-note">【请“科学上网”，否则可能无法加载】</span>
          </div>
        ) : null}
      </div>
    </Reveal>
  )
}

function Group({ index, en, cn, items }) {
  return (
    <div className="group">
      <Reveal className="group__head">
        <span className="sec-no">{index}</span>
        <span className="label">{en}</span>
        <span className="label" style={{ color: 'var(--ink-2)', letterSpacing: '0.08em' }}>
          {cn}
        </span>
        <span className="count">{String(items.length).padStart(2, '0')} Projects</span>
      </Reveal>

      {items.map((p) => (
        <ProjectCard key={p.slug} p={p} />
      ))}
    </div>
  )
}

export default function Work() {
  const design = projects.filter((p) => p.group === 'design')

  return (
    <section className="section" id="work">
      <div className="wrap">
        <header className="sec-head">
          <span className="sec-no">02</span>
          <ProximityText as="h2" className="sec-title">精选项目</ProximityText>
          <span className="sec-en">Selected Work</span>
        </header>

        <Group index="A" en="Design-led" cn="设计型项目" items={design} />

        <Others />

        <div className="group">
          <Reveal className="group__head">
            <span className="sec-no">C</span>
            <span className="label">Research-led</span>
            <span className="label" style={{ color: 'var(--ink-2)', letterSpacing: '0.08em' }}>
              研究型项目
            </span>
            <span className="count">01 Project</span>
          </Reveal>
          <ResearchFeature />
        </div>
      </div>
    </section>
  )
}

import Reveal from '../components/Reveal.jsx'
import ProximityText from '../components/ProximityText.jsx'
import FluxLines from '../components/FluxLines.jsx'
import MagicBento, { BentoCard } from '../components/MagicBento.jsx'
import { capabilities } from '../data/site.js'

export default function Capabilities() {
  return (
    <section className="section caps-section" id="skills">
      <div className="caps-section__bg" aria-hidden="true">
        <FluxLines
          colors={['#6366f1', '#2c2e49', '#6366f1']}
          glow={2}
          rimWidth={0.2}
          lineWidth={1}
          flowDirection="down"
          mouseInteraction
          clickSwirl
        />
      </div>

      <div className="wrap">
        <header className="sec-head">
          <span className="sec-no">03</span>
          <ProximityText as="h2" className="sec-title">个人优势</ProximityText>
          <span className="sec-en">Capabilities</span>
        </header>

        <Reveal>
          <MagicBento
            columns={4}
            rowHeight={200}
            gap={12}
            radius={20}
            enableBorderGlow
            enableSpotlight
            spotlightRadius={300}
            clickEffect
          >
            {capabilities.map((c) => (
              <BentoCard key={c.no} className="cap">
                <div className="cap__top">
                  <span className="label">{c.no}</span>
                  <span className="cap__mark" aria-hidden="true">
                    {c.mark}
                  </span>
                </div>
                <ProximityText as="h3" className="cap__title">{c.title}</ProximityText>
                <p className="cap__cn">{c.cn}</p>
                <p className="cap__body">{c.body}</p>
                <ul className="cap__tags">
                  {c.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </BentoCard>
            ))}
          </MagicBento>
        </Reveal>
      </div>
    </section>
  )
}

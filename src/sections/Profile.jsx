import Reveal from '../components/Reveal.jsx'
import PortraitCard from '../components/PortraitCard.jsx'
import { SkillIcon } from '../components/SkillIcon.jsx'
import ProximityText from '../components/ProximityText.jsx'
import { profile } from '../data/site.js'

function Timeline({ items }) {
  return (
    <ul className="timeline">
      {items.map((it) => (
        <li key={it.title}>
          <time>{it.date}</time>
          <div>
            <strong>{it.title}</strong>
            <span>{it.note}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function Profile() {
  return (
    <section className="section" id="profile">
      <div className="wrap">
        <header className="sec-head">
          <span className="sec-no">01</span>
          <ProximityText as="h2" className="sec-title">个人简介</ProximityText>
          <span className="sec-en">Profile</span>
        </header>

        <div className="about__grid">
          <Reveal as="figure" className="portrait">
            <PortraitCard />
            <figcaption>
              <span>Zhang Zhe — 2026</span>
              <span>Guangzhou</span>
            </figcaption>
          </Reveal>

          <div className="about__text">
            <Reveal>
              <h3>
                以设计为起点，
                <br />
                向<em>技术与研究</em>延伸。
              </h3>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="about__copy">
                {profile.intro.map((p) => (
                  <p key={p.slice(0, 12)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="stats">
                {profile.stats.map((s) => (
                  <div className="stat" key={s.label}>
                    <div className="stat__v">
                      {s.value}
                      {s.sub ? <span>{s.sub}</span> : null}
                    </div>
                    <div className="stat__k">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="drag-hint">
                <span className="drag-hint__arrow" aria-hidden="true">
                  <svg viewBox="0 0 28 12" width="30" height="13" fill="none">
                    <path
                      d="M27 6H2M7.8 1.1 2 6l5.8 4.9"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                TRY DRAGGING
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="about__meta" delay={0.05}>
          <dl>
            <dt>Education</dt>
            <dd>
              <Timeline items={profile.education} />
            </dd>
          </dl>

          <dl>
            <dt>Experience</dt>
            <dd>
              <Timeline items={profile.experience} />
            </dd>
          </dl>

          <dl>
            <dt>Elsewhere</dt>
            <dd>
              <ul className="side-links">
                {profile.email ? (
                  <li>
                    <a href={`mailto:${profile.email}`}>
                      <span className="k">Email</span>
                      <span className="v">{profile.email}</span>
                    </a>
                  </li>
                ) : null}
                {profile.phone ? (
                  <li>
                    <a href={`tel:+86${profile.phone.replace(/-/g, '')}`}>
                      <span className="k">Phone</span>
                      <span className="v">{profile.phone}</span>
                    </a>
                  </li>
                ) : null}
                {profile.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noreferrer">
                      <span className="k">{l.label}</span>
                      <span className="v">{l.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>

          <dl className="skill">
            <dt>Skill</dt>
            <dd>
              <ul className="skill-rows">
                {profile.skills.map((g) => (
                  <li key={g.group}>
                    <span className="sk-k">{g.group}</span>
                    <span className="sk-v">
                      {g.items.map((it, i) => (
                        <span key={it}>
                          {it}
                          {i < g.items.length - 1 ? <i aria-hidden="true">·</i> : null}
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>

              <ul className="skill-tools">
                {profile.tools.map((t) => (
                  <li key={t.name} data-tool={t.icon}>
                    <SkillIcon name={t.icon} />
                    <span>{t.name}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
        </Reveal>

        <Reveal className="about__honors" delay={0.05}>
          <div className="honors-head">
            <span className="label">Honors</span>
            <span className="honors-head__cn">荣誉奖项</span>
          </div>
          <ul className="honors-list">
            {profile.honors.map((h) => (
              <li key={h.name} data-tier={h.tier}>
                <span className="hy">{h.year}</span>
                <span className="hn">{h.name}</span>
                <span className="hl">{h.level}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

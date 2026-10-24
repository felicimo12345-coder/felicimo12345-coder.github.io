import Reveal from '../components/Reveal.jsx'
import ProximityText from '../components/ProximityText.jsx'
import { profile } from '../data/site.js'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <p className="contact__ghost knock skew" aria-hidden="true">
        Let&apos;s talk
      </p>
      <div className="wrap contact__inner">
        <Reveal>
          <p className="label" style={{ marginBottom: 26 }}>
            Contact — 04
          </p>
          <h2 className="contact__title">
            一起做点
            <br />
            <em>有趣</em>的东西。
          </h2>
        </Reveal>

        <Reveal className="contact__row" delay={0.08}>
          <div className="contact__cta">
            <p className="label">Email — 优先联系</p>
            <a className="contact__email" href={`mailto:${profile.email}`}>
              <ProximityText>{profile.email}</ProximityText>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <ul className="contact__links">
            {profile.contacts.map((c) => (
              <li key={c.label}>
                {c.href ? (
                  <a href={c.href}>
                    <span className="k">{c.label}</span>
                    <span className="v">{c.value}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <div className="row">
                    <span className="k">{c.label}</span>
                    <span className="v">{c.value}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <footer className="wrap foot">
        <span>
          © {profile.year} {profile.latin}
        </span>
        <span>Designed &amp; built in Guangzhou</span>
        <span className="foot__right">
          <span>React · Vite</span>
          <a href="#top">Back to top ↑</a>
        </span>
      </footer>
    </section>
  )
}

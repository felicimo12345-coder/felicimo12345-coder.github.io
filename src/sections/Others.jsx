import Reveal from '../components/Reveal.jsx'
import ProximityText from '../components/ProximityText.jsx'
import MagicBento, { BentoCard } from '../components/MagicBento.jsx'
import { others } from '../data/site.js'

/**
 * Others —— 精选项目之后的「其他项目 & 管理」。
 * 上半是企业横向项目（3 张玻璃卡），下半是组织与管理经历（3 条时间线）。
 * 这两块补的是「协作密度」：和老师、企业、同届成员一起把事情推到底。
 */
export default function Others() {
  return (
    <div className="group" id="others">
      <Reveal className="group__head">
        <span className="sec-no">B</span>
        <span className="label">Beyond Projects</span>
        <span className="label" style={{ color: 'var(--ink-2)', letterSpacing: '0.08em' }}>
          其他项目 &amp; 管理
        </span>
        <span className="count">
          {String(others.enterprise.length).padStart(2, '0')} Projects ·{' '}
          {String(others.roles.length).padStart(2, '0')} Roles
        </span>
      </Reveal>

      <Reveal>
        <MagicBento
          className="xp"
          columns={3}
          rowHeight={0}
          gap={14}
          radius={16}
          enableBorderGlow
          enableSpotlight
          spotlightRadius={330}
          clickEffect
          enableTilt
          enableMagnetism
          tiltMax={4}
          magnetMax={6}
        >
          {others.enterprise.map((item, i) => (
            <BentoCard className="xp__card" key={item.title} data-no={String(i + 1).padStart(2, '0')}>
              <h4 className="xp__title">{item.title}</h4>
              <dl className="xp__rows">
                {item.rows.map((row) => (
                  <div key={row.k}>
                    <dt>{row.k}</dt>
                    <dd>{row.v}</dd>
                  </div>
                ))}
              </dl>
            </BentoCard>
          ))}
        </MagicBento>
      </Reveal>

      <Reveal className="roles" delay={0.06}>
        <div className="roles__head">
          <ProximityText as="h4" className="roles__title">
            管理与协作
          </ProximityText>
          <span className="roles__hint">Leadership &amp; Operations</span>
        </div>

        <ul className="roles__list">
          {others.roles.map((r) => (
            <li key={r.title}>
              <span className="roles__date">{r.date}</span>
              <div>
                <p className="roles__name">
                  {r.title}
                  <em>{r.post}</em>
                </p>
                <p className="roles__desc">{r.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}

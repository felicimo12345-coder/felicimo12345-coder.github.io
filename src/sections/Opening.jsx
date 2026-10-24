import ScrollExpand from '../components/ScrollExpand.jsx'

export default function Opening() {
  return (
    <section className="opening" id="opening" aria-label="开场">
      <ScrollExpand
        src="./assets/opening.webp"
        alt="DESIGN FOR EUDAEMONIA — 作品集封面"
        scrollHint="继续向下"
        startWidth={68}
        startHeight={70}
        startRadius={12}
        mediaZoom={1.06}
        scrollDistance={1.1}
        holdDistance={0.15}
        overlayScrim={0.62}
        desaturate
        useWindowScroll
        className="opening__se"
      >
        <div className="opening__copy">
          <p className="opening__label">Opening — 00</p>
          <h2 className="opening__title">
            好的想法始于洞察，
            <br />
            成熟于<em>验证</em>。
          </h2>
          <p className="opening__desc">
            从产品服务到智能交互，我关注设计如何回应实际需求，并通过原型与研究不断修正方案。
          </p>
        </div>
      </ScrollExpand>
    </section>
  )
}

import Image from 'next/image';

export default function FamilyTherapySection({ specs, onSelectBooking }) {
  return (
    <section id="family-therapy" className="y-focus-light photo-stage photo-left light-sand">
      <div className="photo-stage-bg" aria-hidden="true">
        <Image
          src="/bg1.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="photo-stage-img family-pos"
        />
        <div className="photo-stage-veil veil-alabaster-left" />
      </div>

      <div className="container y-split-block photo-stage-content">
        <div className="y-split-window" aria-hidden="true" />

        <div className="y-split-content">
          <span className="y-overline">Напрямок І • Для клієнтів та родин</span>
          <h2>Сімейна й індивідуальна психотерапія</h2>
          <p className="y-split-desc">
            Працюю в інтегративному та психоаналітичному підходах із глибинними причинами тривоги, криз адаптації та повторюваних конфліктів у парі чи між поколіннями.
          </p>

          <div className="y-focus-cards">
            {specs.map((spec, idx) => (
              <div key={spec.id || idx} className="y-focus-item glass-card">
                <span className="y-num">0{idx + 1}</span>
                <div>
                  <h3>{spec.name}</h3>
                  {spec.description && <p>{spec.description}</p>}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onSelectBooking}
            className="btn btn-primary"
          >
            Обрати час для консультації →
          </button>
        </div>
      </div>
    </section>
  );
}

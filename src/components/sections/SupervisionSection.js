import Image from 'next/image';

export default function SupervisionSection({ specs, onSelectBooking }) {
  return (
    <section id="supervision" className="y-focus-dark photo-stage photo-right dark-forest">
      <div className="photo-stage-bg" aria-hidden="true">
        <Image
          src="/bg2.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="photo-stage-img sup-pos"
        />
        <div className="photo-stage-veil veil-forest-right" />
      </div>

      <div className="container y-split-block reverse photo-stage-content">
        <div className="y-split-content">
          <span className="y-overline gold">Напрямок ІІ • Для колег-психологів</span>
          <h2>Супервізія, Інтервізія та Менторство</h2>
          <p className="y-split-desc light">
            Професійний простір для фахівців допомагаючих професій: аналіз клієнтських випадків у полімодальному багатофокусному підході, старт практики та збереження ресурсності.
          </p>

          <div className="y-dark-cards">
            {specs.map((spec, idx) => (
              <div key={spec.id || idx} className="y-dark-item dark-glass">
                <span className="y-num gold">0{idx + 1}</span>
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
            className="btn btn-gold"
          >
            Записатися на супервізію / менторство →
          </button>
        </div>

        <div className="y-split-window" aria-hidden="true" />
      </div>
    </section>
  );
}

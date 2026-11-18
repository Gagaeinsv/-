export default function ServicesSection({ services, onSelectBooking }) {
  return (
    <section id="services" className="y-services">
      <div className="container">
        <div className="y-sec-head center">
          <span className="y-overline">Формати співпраці</span>
          <h2>Послуги та Вартість</h2>
          <p>Оберіть потрібний формат зустрічі та зафіксуйте зручний слот у розкладі.</p>
        </div>

        <div className="y-services-grid">
          {services.map((s) => (
            <div key={s.id} className="y-service-card">
              <div className="y-srv-top">
                <span className="y-srv-dur">⏱️ {s.duration} хвилин</span>
                <span className="y-srv-online">Онлайн</span>
              </div>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <div className="y-srv-foot">
                <div className="y-srv-price">{s.priceUah} грн</div>
                <button
                  type="button"
                  onClick={() => onSelectBooking(s.id)}
                  className="btn btn-primary w-full"
                >
                  Забронювати сесію
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

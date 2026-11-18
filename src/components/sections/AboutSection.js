import Image from 'next/image';

export default function AboutSection({ profile }) {
  return (
    <section id="about" className="y-about photo-stage photo-right light-sand">
      <div className="photo-stage-bg" aria-hidden="true">
        <Image
          src="/bg4.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 56vw"
          className="photo-stage-img about-pos"
        />
        <div className="photo-stage-veil veil-sand-right" />
      </div>

      <div className="container y-about-grid photo-stage-content">
        <div className="y-about-text-col">
          <span className="y-overline">Про фахівчиню</span>
          <h2>Інтегративний підхід та повага до вашої історії</h2>
          <p className="y-about-lead">{profile.bio}</p>

          <div className="y-atelier-facts glass-panel">
            <div className="y-fact-row">
              <span>Кваліфікація</span>
              <strong>Магістерка психології, психоаналітикиня у навчанні</strong>
            </div>
            <div className="y-fact-row">
              <span>Супервізія</span>
              <strong>Сертифікована супервізорка в полімодальному багатофокусному підході</strong>
            </div>
            <div className="y-fact-row">
              <span>Групи та СП</span>
              <strong>Консультантка СП «Разом», ведуча психологічних та інтервізійних груп</strong>
            </div>
            <div className="y-fact-row">
              <span>Практика</span>
              <strong>{profile.experience} років досвіду • Онлайн по всьому світу</strong>
            </div>
          </div>
        </div>

        <div className="y-about-window" aria-hidden="true" />
      </div>
    </section>
  );
}

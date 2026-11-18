import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection({ profile }) {
  return (
    <section className="y-hero photo-stage photo-left dark-studio">
      <div className="photo-stage-bg" aria-hidden="true">
        <Image
          src="/bg3.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 56vw"
          className="photo-stage-img hero-pos"
        />
        <div className="photo-stage-veil veil-studio-left" />
      </div>

      <div className="container y-hero-grid photo-stage-content">
        <div className="y-hero-window">
          <div className="y-portrait-caption dark-glass">
            <Image
              src="/avatar_new.png"
              alt={profile.name}
              width={48}
              height={48}
              className="y-mini-avatar"
            />
            <div>
              <strong>{profile.name}</strong>
              <span>Магістерка психології • {profile.experience}+ років практики</span>
            </div>
          </div>
        </div>

        <div className="y-hero-content dark-surface">
          <span className="y-overline gold">Онлайн-кабінет психології та супервізії</span>
          <h1>
            Простір глибинного розуміння, <em>сімейної гармонії</em> та професійної опори
          </h1>
          <p className="y-hero-sub">{profile.subtitle}</p>
          <p className="y-hero-lead">
            Підтримую родини, пари та особистостей у періоди змін, а також супроводжую практикуючих психологів у полімодальному багатофокусному підході.
          </p>

          <div className="y-hero-btns">
            <a href="#booking" className="btn btn-gold btn-lg">
              Забронювати консультацію
            </a>
            <Link href="/cabinet" className="btn btn-glass-light btn-lg">
              Особистий кабінет
            </Link>
          </div>

          <div className="y-credentials-row dark">
            <span>🎓 Магістерка психології</span>
            <span>✦ Сертифікована супервізорка</span>
            <span>🏛️ Психоаналітикиня у навчанні</span>
            <span>⚖️ Офіційний ФОП</span>
          </div>
        </div>
      </div>
    </section>
  );
}

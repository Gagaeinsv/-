'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';
import BookingWidget from '@/components/BookingWidget';
import { getFallbackPayload } from '@/lib/defaultData';
import { getTelegramUrl, getViberUrl, getWhatsappUrl } from '@/lib/scheduleUtils';

const FAQ_ITEMS = [
  {
    q: 'У яких підходах проходять консультації та супервізії?',
    a: 'Я працюю на перетині полімодального багатофокусного, інтегративного та психоаналітичного підходів. Це дозволяє поєднувати глибинне дослідження несвідомих сценаріїв із дієвою підтримкою в актуальних сімейних чи професійних кризах.',
  },
  {
    q: 'Як відбувається сімейна або парна консультація онлайн?',
    a: 'Зустріч триває 60 хвилин у форматі відеоконференції. Можлива присутність обох партнерів або членів родини з одного чи різних пристроїв. Ми фокусуємося на безпечному діалозі та розумінні системної динаміки стосунків.',
  },
  {
    q: 'Чим відрізняється супервізія від менторства для початківців?',
    a: 'Індивідуальна супервізія фокусується на розборі клієнтського кейсу, переносі/контрпереносі та сліпих зонах у терапії. Менторство додатково допомагає побудувати приватну практику, сформувати професійну ідентичність, контракт та етичні межі.',
  },
  {
    q: 'Чи можу я перенести сесію або знайти посилання на зустріч пізніше?',
    a: 'Так. Одразу після бронювання ви отримаєте код запису для Особистого кабінету клієнта. У ньому завжди доступні посилання на відеозустріч, реквізити оплати та функція перенесення не пізніше ніж за 24 години до старту.',
  },
  {
    q: 'Як здійснюється офіційна оплата?',
    a: 'Оплата проводиться офіційно за реквізитами ФОП (IBAN), банківською карткою через Monobank або за допомогою PayPal для клієнтів з будь-якої країни світу.',
  },
];

export default function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [activeFaq, setActiveFaq] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [legalModal, setLegalModal] = useState({ isOpen: false, title: '', content: '' });

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch('/api/content');
        const json = await res.json();
        if (active && json.success) {
          setData(json);
          if (json.services?.length > 0) setSelectedServiceId(json.services[0].id);
        } else if (active) {
          const fb = getFallbackPayload();
          setData(fb);
          setSelectedServiceId(fb.services[0].id);
        }
      } catch {
        if (active) {
          const fb = getFallbackPayload();
          setData(fb);
          setSelectedServiceId(fb.services[0].id);
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const openLegalDoc = (type) => {
    const doc = data?.legalDocs?.find((d) => d.type === type);
    if (doc) {
      setLegalModal({ isOpen: true, title: doc.title, content: doc.content });
    }
  };

  const scrollToBooking = (serviceId) => {
    if (serviceId) setSelectedServiceId(serviceId);
    setMobileMenuOpen(false);
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading || !data) {
    return (
      <div className="site-loader">
        <div className="spinner" />
        <p>Завантажуємо кабінет...</p>
      </div>
    );
  }

  const { profile, services = [] } = data;
  const paymentSettings = profile?.paymentSettings;
  const specs = profile?.specializations || [];

  // Split specializations cleanly between Client/Family Therapy (first 2 + general) and Colleague Supervision/Mentoring (remaining)
  const familySpecs = specs.slice(0, 2);
  const supervisionSpecs = specs.slice(2);
  const supervisionService = services.find((s) => s.category === 'SUPERVISION') || services[services.length - 1];

  return (
    <div className="yarmola-site">
      {/* Editorial Sticky Header */}
      <header className="y-header">
        <div className="container y-header-inner">
          <Link href="/" className="y-brand">
            <span className="y-brand-name">{profile.name}</span>
            <span className="y-brand-role">Сімейна психологиня • Супервізорка</span>
          </Link>

          <nav className={`y-nav ${mobileMenuOpen ? 'open' : ''}`}>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>Про фахівчиню</a>
            <a href="#family-therapy" onClick={() => setMobileMenuOpen(false)}>Сімейна терапія</a>
            <a href="#supervision" onClick={() => setMobileMenuOpen(false)}>Супервізія та Менторство</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Послуги</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <div className="y-nav-actions">
              <Link href="/cabinet" className="btn btn-secondary y-nav-cab" onClick={() => setMobileMenuOpen(false)}>
                Кабінет клієнта
              </Link>
              <a href="#booking" className="btn btn-primary y-nav-cta" onClick={() => setMobileMenuOpen(false)}>
                Забронювати час
              </a>
            </div>
          </nav>

          <button
            type="button"
            className={`y-burger ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
            aria-expanded={mobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Editorial Magazine Hero */}
      <section className="y-hero">
        <div className="container y-hero-grid">
          <div className="y-hero-media">
            <div className="y-editorial-frame">
              <img src="/bg3.jpg" alt={profile.name} className="y-hero-portrait" />
            </div>
            <div className="y-portrait-caption">
              <img src="/avatar_new.png" alt={profile.name} className="y-mini-avatar" />
              <div>
                <strong>{profile.name}</strong>
                <span>Магістерка психології • {profile.experience}+ років практики</span>
              </div>
            </div>
          </div>

          <div className="y-hero-content">
            <span className="y-overline">Онлайн-кабінет психології та супервізії</span>
            <h1>
              Простір глибинного розуміння, <em>сімейної гармонії</em> та професійної опори
            </h1>
            <p className="y-hero-sub">{profile.subtitle}</p>
            <p className="y-hero-lead">
              Підтримую родини, пари та особистостей у періоди змін, а також супроводжую практикуючих психологів у полімодальному багатофокусному підході.
            </p>

            <div className="y-hero-btns">
              <a href="#booking" className="btn btn-primary btn-lg">
                Забронювати консультацію
              </a>
              <Link href="/cabinet" className="btn btn-secondary btn-lg">
                Особистий кабінет
              </Link>
            </div>

            <div className="y-credentials-row">
              <span>🎓 Магістерка психології</span>
              <span>✦ Сертифікована супервізорка</span>
              <span>🏛️ Психоаналітикиня у навчанні</span>
              <span>⚖️ Офіційний ФОП</span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Quote Strip */}
      <section className="y-quote-strip">
        <div className="container y-quote-inner">
          <span className="y-quote-mark">“</span>
          <blockquote>
            Я прагну допомогти людям почути й зрозуміти себе, знайти внутрішню стійкість, а колегам — сформувати власний впевнений терапевтичний голос.
          </blockquote>
        </div>
      </section>

      {/* About & Philosophy Section */}
      <section id="about" className="y-about">
        <div className="container y-about-grid">
          <div className="y-about-text-col">
            <span className="y-overline">Про фахівчиню</span>
            <h2>Інтегративний підхід та повага до вашої історії</h2>
            <p className="y-about-lead">{profile.bio}</p>

            <div className="y-atelier-facts">
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

          <div className="y-about-media-col">
            <div className="y-secondary-frame">
              <img src="/bg4.jpg" alt={`${profile.name} — філософія роботи`} />
            </div>
          </div>
        </div>
      </section>

      {/* Focus Block A: Family & Individual Therapy */}
      <section id="family-therapy" className="y-focus-light">
        <div className="container y-split-block">
          <div className="y-split-photo">
            <div className="y-portrait-card">
              <img src="/bg1.jpg" alt="Сімейна та індивідуальна терапія" />
            </div>
          </div>

          <div className="y-split-content">
            <span className="y-overline">Напрямок І • Для клієнтів та родин</span>
            <h2>Сімейна й індивідуальна психотерапія</h2>
            <p className="y-split-desc">
              Працюю в інтегративному та психоаналітичному підходах із глибинними причинами тривоги, криз адаптації та повторюваних конфліктів у парі чи між поколіннями.
            </p>

            <div className="y-focus-cards">
              {(familySpecs.length > 0 ? familySpecs : specs).map((spec, idx) => (
                <div key={spec.id || idx} className="y-focus-item">
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
              onClick={() => scrollToBooking(services[0]?.id)}
              className="btn btn-primary"
            >
              Обрати час для консультації →
            </button>
          </div>
        </div>
      </section>

      {/* Focus Block B: Dark Deep Cypress Contrast Section for Colleagues */}
      <section id="supervision" className="y-focus-dark">
        <div className="container y-split-block reverse">
          <div className="y-split-content">
            <span className="y-overline gold">Напрямок ІІ • Для колег-психологів</span>
            <h2>Супервізія, Інтервізія та Менторство</h2>
            <p className="y-split-desc light">
              Професійний простір для фахівців допомагаючих професій: аналіз клієнтських випадків у полімодальному багатофокусному підході, старт практики та збереження ресурсності.
            </p>

            <div className="y-dark-cards">
              {(supervisionSpecs.length > 0 ? supervisionSpecs : specs).map((spec, idx) => (
                <div key={spec.id || idx} className="y-dark-item">
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
              onClick={() => scrollToBooking(supervisionService?.id)}
              className="btn btn-gold"
            >
              Записатися на супервізію / менторство →
            </button>
          </div>

          <div className="y-split-photo">
            <div className="y-portrait-card dark">
              <img src="/bg2.jpg" alt="Супервізія та менторство для психологів" />
            </div>
          </div>
        </div>
      </section>

      {/* Services & Pricing */}
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
                    onClick={() => scrollToBooking(s.id)}
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

      {/* Interactive Booking Section */}
      <section id="booking" className="y-booking-sec">
        <div className="container">
          <div className="y-sec-head center">
            <span className="y-overline">Актуальний розклад</span>
            <h2>Запис на консультацію та Календар</h2>
            <p>
              Вже маєте заброньовану сесію?{' '}
              <Link href="/cabinet" className="y-inline-link">
                Перейдіть у Кабінет клієнта для перенесення чи посилання на зустріч →
              </Link>
            </p>
          </div>

          <div className="y-booking-shell">
            <BookingWidget
              profile={profile}
              services={services}
              paymentSettings={paymentSettings}
              preselectedServiceId={selectedServiceId}
              onSelectService={setSelectedServiceId}
            />
          </div>

          <div className="y-booking-note">
            🤍 Перший крок можна зробити у спокійному для вас темпі. Не обов’язково формулювати запит ідеально заздалегідь — ми структуровані та уважні до вашого стану вже з перших хвилин розмови.
          </div>
        </div>
      </section>

      {/* FAQ Section with Clean Portrait */}
      <section id="faq" className="y-faq-sec">
        <div className="container y-faq-grid">
          <div className="y-faq-photo-col">
            <div className="y-portrait-card faq-photo">
              <img src="/bg5.jpg" alt={`${profile.name} — часті запитання`} />
            </div>
          </div>

          <div className="y-faq-content-col">
            <span className="y-overline">Питання та відповіді</span>
            <h2>Організаційні аспекти</h2>
            <div className="y-faq-list">
              {FAQ_ITEMS.map((item, idx) => (
                <div key={idx} className={`y-faq-item ${activeFaq === idx ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="y-faq-btn"
                    onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                  >
                    <span>{item.q}</span>
                    <b>{activeFaq === idx ? '−' : '+'}</b>
                  </button>
                  {activeFaq === idx && <div className="y-faq-ans">{item.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="y-footer">
        <div className="container y-footer-grid">
          <div className="y-footer-brand">
            <h3>{profile.name}</h3>
            <p className="y-footer-role">{profile.title}</p>
            <p className="y-footer-fop">
              ФОП {profile.name}
              <br />
              ЄДРПОУ: {paymentSettings?.edrpou}
              <br />
              Спрощена система оподаткування, 3 група
            </p>
          </div>

          <div className="y-footer-col">
            <h4>Навігація та Правова інформація</h4>
            <Link href="/cabinet" className="y-footer-link">
              👤 Особистий кабінет клієнта
            </Link>
            <button type="button" onClick={() => openLegalDoc('OFFER')} className="y-footer-link">
              📄 Публічна оферта (Договір)
            </button>
            <button type="button" onClick={() => openLegalDoc('PRIVACY')} className="y-footer-link">
              🔒 Політика конфіденційності
            </button>
            <Link href="/admin" className="y-footer-link muted">
              🔐 Кабінет фахівчині (Вхід)
            </Link>
          </div>

          <div className="y-footer-col">
            <h4>Контакти</h4>
            <p>📱 Тел / Telegram: {profile.phone}</p>
            <p>💬 WhatsApp: {profile.whatsapp}</p>
            <div className="y-footer-socials">
              <a href={getTelegramUrl(profile.telegram || profile.phone)} target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
              <a href={getViberUrl(profile.phone)} target="_blank" rel="noopener noreferrer">
                Viber
              </a>
              <a href={getWhatsappUrl(profile.whatsapp || profile.phone)} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              {profile.facebook && (
                <a href={profile.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="y-footer-bottom">
          © {new Date().getFullYear()} {profile.name}. Сімейна психологія та полімодальна супервізія.
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="y-sticky-cta">
        <a href="#booking" className="btn btn-primary w-full">
          Записатися на сесію
        </a>
      </div>

      {/* Legal Modal */}
      <Modal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
        title={legalModal.title}
      >
        <div className="legal-content-pre">{legalModal.content}</div>
      </Modal>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Calendar from '@/components/Calendar';
import Modal from '@/components/Modal';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Booking state
  const [successfulBooking, setSuccessfulBooking] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  
  // Custom interactive states
  const [activeFaq, setActiveFaq] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);

  // Modal states for legal docs
  const [legalModal, setLegalModal] = useState({ isOpen: false, title: '', content: '' });

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch('/api/content');
        const json = await res.json();
        if (json.success) {
          setData(json);
          if (json.services && json.services.length > 0) {
            setSelectedServiceId(json.services[0].id);
          }
        } else {
          setError(json.error || 'Не вдалося завантажити контент');
        }
      } catch (err) {
        setError('Помилка з’єднання з сервером');
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  const openLegalDoc = (type) => {
    const doc = data?.legalDocs?.find(d => d.type === type);
    if (doc) {
      setLegalModal({
        isOpen: true,
        title: doc.title,
        content: doc.content
      });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Реквізити скопійовано в буфер обміну!');
  };

  if (loading) {
    return (
      <div className="home-loading">
        <div className="spinner"></div>
        <p>Завантаження сторінки...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="home-error">
        <p>{error || 'Контент відсутній'}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">Спробувати знову</button>
      </div>
    );
  }

  const { profile, services } = data;
  const paymentSettings = profile?.paymentSettings;

  return (
    <div className="landing-layout">
      {/* Header (Cindy Style Navigation) */}
      <header className="site-header">
        <div className="container header-container">
          <div className="logo">
            <span className="logo-name">{profile.name}</span>
            <span className="logo-title">{profile.title}</span>
          </div>
          
          <button 
            className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <nav className={`site-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>Про мене</a>
            <a href="#specializations" onClick={() => { setIsFocusModalOpen(true); setIsMobileMenuOpen(false); }}>Спрямування</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Послуги</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
            <a href="#booking" className="btn btn-primary nav-cta" onClick={() => setIsMobileMenuOpen(false)}>Записатись</a>
          </nav>
        </div>
      </header>

      {/* Background Section 1: Hero + About */}
      <div className="bg-section bg-section-1">
        {/* Hero Section (Cindy Layout Clone: Left Image Hexagon, Right Tagline & Description) */}
        <section className="cindy-hero-section">
          <div className="container">
            <div className="cindy-hero-grid">
              <div className="hero-portrait-col-empty"></div>
              
              <div className="cindy-hero-text">
                <h1 className="cindy-hero-tagline">
                  Я маю вільні години для онлайн-терапії та буду рада підтримати вас у цей період невизначеності
                </h1>
                <p className="cindy-hero-intro">
                  Професійні психологічні консультації та терапія в рамках українського законодавства. Допомагаю дослідити життєві орієнтири, побудувати гармонійні взаємини із близькими та знайти внутрішню впевненість.
                </p>
                <div className="hero-actions">
                  <a href="#booking" className="btn btn-primary btn-lg">Записатися на зустріч</a>
                  <a href="#about" className="btn btn-secondary btn-lg hero-btn-secondary">Дізнатися більше</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Welcome / Intro Section */}
        <section id="about" className="cindy-welcome-section">
          <div className="container">
            <div className="cindy-welcome-grid">
              <div className="welcome-portrait-col-empty"></div>
              
              <div className="cindy-welcome-content-col">
                <div className="cindy-welcome-content">
                  <span className="section-badge">Про мене</span>
                  <h2>Привіт, я {profile.name}</h2>
                  <p>{profile.bio}</p>
                  <div className="hero-actions">
                    <button onClick={() => setIsFocusModalOpen(true)} className="btn btn-primary">
                      🎯 Професійне спрямування
                    </button>
                  </div>
                </div>
                <div className="about-facts-container">
                  <div className="facts-card">
                    <h3>Професійна довідка</h3>
                    <ul className="facts-list">
                      <li><strong>🎓 Освіта:</strong> Вища психологічна, додаткова сертифікація за європейськими стандартами</li>
                      <li><strong>💼 Досвід:</strong> {profile.experience} років практичної роботи</li>
                      <li><strong>🌍 Формат:</strong> Онлайн-консультації по всьому світу</li>
                      <li><strong>🗣️ Мови:</strong> Українська, російська</li>
                      <li><strong>🔒 Гарантія:</strong> Офіційний ФОП — безпека розрахунків</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Background Section 2: Quote */}
      <div className="bg-section bg-section-2">
        {/* Quote / Mission Section */}
        <section className="cindy-quote-section">
          <div className="container">
            <div className="cindy-quote-layout-grid">
              <div className="quote-portrait-col-empty"></div>
              <div className="cindy-quote-content-col">
                <p className="cindy-quote-text">
                  «Я прагну допомогти людям почути і зрозуміти себе, знайти внутрішній баланс та відновити гармонію у стосунках із близькими»
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Background Section 3: Services + FAQ */}
      <div className="bg-section bg-section-3">
        {/* Services Offered Section */}
        <section id="services" className="cindy-services-section">
          <div className="container">
            <div className="cindy-services-layout-grid">
              <div className="services-portrait-col-empty"></div>
              <div className="cindy-services-content-col">
                <div className="mb-12">
                  <span className="section-badge">Послуги</span>
                  <h2>Як ми можемо працювати разом</h2>
                  <p className="section-subtitle">Оберіть формат терапевтичної підтримки, який найкраще відповідає вашому запиту</p>
                </div>
                
                <div className="cindy-services-grid">
                  {services.map((s) => (
                    <div key={s.id} className="cindy-service-card">
                      <h3>{s.name}</h3>
                      <p>{s.description}</p>
                      <div className="cindy-service-meta">
                        <div className="cindy-service-details-row">
                          <span>⏱️ {s.duration} хвилин</span>
                          <span>{s.priceUah} грн</span>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedServiceId(s.id);
                            document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                          }} 
                          className="btn btn-primary w-full"
                        >
                          Забронювати сесію
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="faq-section">
          <div className="container">
            <div className="cindy-faq-layout-grid">
              <div className="faq-portrait-col-empty"></div>
              <div className="cindy-faq-content-col">
                <div className="mb-12">
                  <span className="section-badge">FAQ</span>
                  <h2>Часті запитання</h2>
                  <p className="section-subtitle">Організаційні та практичні моменти нашої співпраці</p>
                </div>
                <div className="faq-accordion">
                  {[
                    {
                      q: "Як часто потрібно проходити сесії?",
                      a: "Зазвичай зустрічі проходять один раз на тиждень. Це оптимальна частота для стабільної роботи над запитом та інтеграції змін у повсякденне життя."
                    },
                    {
                      q: "Яка тривалість однієї консультації?",
                      a: "Індивідуальна та дитячо-батьківська консультації тривають 50 хвилин. Це стандартний терапевтичний час."
                    },
                    {
                      q: "Чи можна скасувати або перенести сесію?",
                      a: "Так, перенос або скасування можливі без додаткової оплати не пізніше ніж за 24 години до призначеного часу. За скасування пізніше цього терміну сесія оплачується у повному обсязі."
                    },
                    {
                      q: "Як проходить оплата?",
                      a: "Ви можете сплатити сесію офіційно на реквізити ФОП (IBAN), карткою онлайн через Monobank або через PayPal (для міжнародних клієнтів) безпосередньо після онлайн-запису."
                    },
                    {
                      q: "Чи є консультації конфіденційними?",
                      a: "Так, повна конфіденційність є базовим правилом моєї роботи. Будь-які деталі вашої історії залишаються у суворій таємниці, за винятком випадків супервізії (без імен та ідентифікаторів) та ситуацій загрози життю."
                    }
                  ].map((item, index) => (
                    <div key={index} className={`faq-item ${activeFaq === index ? 'open' : ''}`}>
                      <div 
                        className="faq-question"
                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      >
                        <h4>{item.q}</h4>
                        <span className="faq-arrow">{activeFaq === index ? '▲' : '▼'}</span>
                      </div>
                      {activeFaq === index && (
                        <div className="faq-answer">
                          <p>{item.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Background Section 4: Booking */}
      <div className="bg-section bg-section-4">
        {/* Booking and Calendar Section */}
        <section id="booking" className="booking-section">
          <div className="container">
            <div className="cindy-booking-layout-grid">
              <div className="booking-portrait-col-empty"></div>
              <div className="cindy-booking-content-col">
                <div className="mb-12">
                  <span className="section-badge">Онлайн-запис</span>
                  <h2>Записатися на консультацію</h2>
                  <p className="section-subtitle">Оберіть зручний час, введіть контакти та забронюйте сесію</p>
                </div>

                <div className="booking-box-container">
                  {profile.calendlyLink ? (
                    <div className="calendly-embed-wrapper">
                      <iframe 
                        src={`${profile.calendlyLink.includes('?') ? profile.calendlyLink + '&' : profile.calendlyLink + '?'}hide_landing_page_details=1&hide_gdpr_banner=1`}
                        width="100%" 
                        height="650" 
                        frameBorder="0"
                        title="Calendly Scheduler"
                        className="calendly-iframe"
                      ></iframe>
                    </div>
                  ) : !successfulBooking ? (
                    <div className="booking-form-wrapper">
                      <Calendar 
                        services={services} 
                        paymentSettings={paymentSettings} 
                        onBookingSuccess={(booking) => setSuccessfulBooking(booking)}
                        preselectedServiceId={selectedServiceId}
                      />
                      <div className="booking-helper-microcopy">
                        <p>🤍 Перший крок можна зробити у спокійному для вас темпі. Не обов’язково точно формулювати запит заздалегідь — мы розберемося разом під час зустрічі.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="payment-checkout-card">
                      <div className="checkout-success-header">
                        <span className="success-icon">🎉</span>
                        <h2>Запис успішно створено!</h2>
                        <p>Дякуємо за запис, <strong>{successfulBooking.clientName}</strong>. Вашу сесію заброньовано на:</p>
                        <div className="checkout-session-details">
                          <span>🗓️ {successfulBooking.date}</span>
                          <span>⏱️ {successfulBooking.timeSlot}</span>
                          <span>💼 {successfulBooking.service.name}</span>
                          <span className="price-tag">{successfulBooking.service.priceUah} грн</span>
                        </div>
                      </div>

                      <div className="checkout-payment-details">
                        <h3>Оплата послуг</h3>
                        <p className="mb-4">Ви здійснюєте офіційну оплату ФОП. Будь ласка, виконайте оплату відповідно до обраного методу:</p>

                        {successfulBooking.paymentMethod === 'IBAN' && (
                          <div className="iban-payment-box">
                            <h4>Реквізити ФОП для оплати (IBAN)</h4>
                            <table className="iban-table">
                              <tbody>
                                <tr>
                                  <td>Отримувач:</td>
                                  <td><strong>ФОП {profile.name}</strong></td>
                                </tr>
                                <tr>
                                  <td>Рахунок IBAN:</td>
                                  <td>
                                    <span className="iban-number">{paymentSettings.iban}</span>
                                    <button onClick={() => copyToClipboard(paymentSettings.iban)} className="btn-copy">📋</button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>ЄДРПОУ / ІПН:</td>
                                  <td>
                                    <span>{paymentSettings.edrpou}</span>
                                    <button onClick={() => copyToClipboard(paymentSettings.edrpou)} className="btn-copy">📋</button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Банк:</td>
                                  <td>{paymentSettings.bankName}</td>
                                </tr>
                                <tr>
                                  <td>Призначення:</td>
                                  <td>Оплата за психологічні послуги за записом від {successfulBooking.date}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}

                        {successfulBooking.paymentMethod === 'MONO' && (
                          <div className="mono-payment-box text-center">
                            <h4>Оплата онлайн через Monobank</h4>
                            <p>Клацніть кнопку нижче, щоб перейти на офіційну сторінку оплати.</p>
                            <a href={paymentSettings.monoLink} target="_blank" rel="noopener noreferrer" className="btn btn-mono mt-4">
                              💳 Оплатити через Monobank
                            </a>
                          </div>
                        )}

                        {successfulBooking.paymentMethod === 'PAYPAL' && (
                          <div className="paypal-payment-box text-center">
                            <h4>Оплата через PayPal</h4>
                            <p>Надішліть платіж на електронну адресу або перейдіть за посиланням PayPal.Me:</p>
                            <div className="paypal-details mt-4">
                              <div>Email: <strong>{paymentSettings.paypalEmail}</strong></div>
                              {paymentSettings.paypalLink && (
                                <a href={paymentSettings.paypalLink} target="_blank" rel="noopener noreferrer" className="btn btn-paypal mt-4">
                                  💸 Оплатити через PayPal.Me
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="checkout-actions">
                        <p className="mb-4">Зв’яжіться зі спеціалісткою для підтвердження сесії:</p>
                        <div className="messenger-buttons">
                          <a href={`https://t.me/${profile.phone.replace(/\+/g, '').replace(/^[0-9]/, '')}`} target="_blank" rel="noopener noreferrer" className="btn-msg telegram">
                            ✈️ Telegram
                          </a>
                          <a href={`viber://chat?number=%2B${profile.phone.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-msg viber">
                            💬 Viber
                          </a>
                          <a href={`https://wa.me/${profile.whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-msg whatsapp">
                            💬 WhatsApp
                          </a>
                        </div>
                        <button onClick={() => setSuccessfulBooking(null)} className="btn btn-secondary mt-8">
                          Забронювати ще одну сесію
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="site-footer">
        <div className="container footer-container">
          <div className="footer-brand">
            <h3>{profile.name}</h3>
            <p className="logo-title">{profile.title}</p>
            <p className="footer-legal-text mt-4">
              ФОП {profile.name}<br />
              ЄДРПОУ: {paymentSettings.edrpou}<br />
              Спрощена система оподаткування, 3 група
            </p>
          </div>
          <div className="footer-links">
            <h4>Правова інформація</h4>
            <button onClick={() => openLegalDoc('OFFER')} className="footer-link-btn">Публічна оферта (Договір)</button>
            <button onClick={() => openLegalDoc('PRIVACY')} className="footer-link-btn">Політика конфіденційності</button>
            <Link href="/admin" className="footer-link-btn text-muted">🔐 Вхід в адмінку</Link>
          </div>
          <div className="footer-contacts">
            <h4>Контакти</h4>
            <p>📱 Тел / Telegram: {profile.phone}</p>
            <p>💬 WhatsApp: {profile.whatsapp}</p>
            {profile.facebook && <p>🌍 Facebook: <a href={profile.facebook} target="_blank" rel="noopener noreferrer">Профіль</a></p>}
          </div>
        </div>
      </footer>

      {/* Reusable Legal Modals */}
      <Modal isOpen={legalModal.isOpen} onClose={() => setLegalModal({ ...legalModal, isOpen: false })} title={legalModal.title}>
        <div className="legal-modal-body">{legalModal.content}</div>
      </Modal>

      {/* Custom Screenshot Profile Modal ("Професійне спрямування") */}
      {isFocusModalOpen && (
        <div className="screenshot-modal-overlay" onClick={() => setIsFocusModalOpen(false)}>
          <div className="screenshot-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="screenshot-modal-close" onClick={() => setIsFocusModalOpen(false)}>×</button>
            <div className="hexagon-wrapper">
              <img src="/avatar_new.png" alt={profile.name} className="hexagon-portrait" />
            </div>
            <h2 className="screenshot-modal-title">Професійне спрямування</h2>
            <ul className="screenshot-modal-list">
              {profile.specializations.map((spec) => (
                <li key={spec.id}>{spec.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

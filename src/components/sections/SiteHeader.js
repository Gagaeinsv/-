'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SiteHeader({ profileName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="y-header">
      <div className="container y-header-inner">
        <Link href="/" className="y-brand">
          <span className="y-brand-name">{profileName}</span>
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
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Меню"
          aria-expanded={mobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

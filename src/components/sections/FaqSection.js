'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FAQ_ITEMS } from '@/data/landingContent';

export default function FaqSection({ profileName }) {
  const [activeFaq, setActiveFaq] = useState(0);

  return (
    <section id="faq" className="y-faq-sec">
      <div className="container y-faq-grid">
        <div className="y-faq-photo-col">
          <div className="y-portrait-card faq-photo">
            <Image
              src="/bg5.jpg"
              alt={`${profileName} — часті запитання`}
              width={681}
              height={1024}
            />
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
  );
}

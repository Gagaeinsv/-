import Link from 'next/link';
import { getTelegramUrl, getViberUrl, getWhatsappUrl } from '@/lib/scheduleUtils';

export default function SiteFooter({ profile, paymentSettings, onOpenLegalDoc }) {
  return (
    <>
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
            <button type="button" onClick={() => onOpenLegalDoc('OFFER')} className="y-footer-link">
              📄 Публічна оферта (Договір)
            </button>
            <button type="button" onClick={() => onOpenLegalDoc('PRIVACY')} className="y-footer-link">
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

      <div className="y-sticky-cta">
        <a href="#booking" className="btn btn-primary w-full">
          Записатися на сесію
        </a>
      </div>
    </>
  );
}

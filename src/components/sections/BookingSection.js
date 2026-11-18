import Link from 'next/link';
import Image from 'next/image';
import BookingWidget from '@/components/BookingWidget';

export default function BookingSection({
  profile,
  services,
  paymentSettings,
  selectedServiceId,
  onSelectService,
}) {
  return (
    <section id="booking" className="y-booking-sec photo-stage">
      <div className="photo-stage-full" aria-hidden="true">
        <Image
          src="/nature_booking_bg.png"
          alt=""
          fill
          sizes="100vw"
          className="photo-stage-img"
        />
        <div className="photo-stage-veil veil-sand-mist" />
      </div>

      <div className="container photo-stage-content">
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
            onSelectService={onSelectService}
          />
        </div>

        <div className="y-booking-note">
          🤍 Перший крок можна зробити у спокійному для вас темпі. Не обов’язково формулювати запит ідеально заздалегідь — ми структуровані та уважні до вашого стану вже з перших хвилин розмови.
        </div>
      </div>
    </section>
  );
}

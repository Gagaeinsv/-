import Image from 'next/image';

export default function QuoteStripSection() {
  return (
    <section className="y-quote-strip photo-stage photo-full">
      <div className="photo-stage-full" aria-hidden="true">
        <Image
          src="/bg5.jpg"
          alt=""
          fill
          sizes="100vw"
          className="photo-stage-img quote-bridge-pos"
        />
        <div className="photo-stage-veil veil-bridge-quote" />
      </div>

      <div className="container y-quote-grid photo-stage-content">
        <div className="y-quote-window" aria-hidden="true" />
        <div className="y-quote-inner">
          <span className="y-quote-mark">“</span>
          <blockquote>
            Я прагну допомогти людям почути й зрозуміти себе, знайти внутрішню стійкість, а колегам — сформувати власний впевнений терапевтичний голос.
          </blockquote>
        </div>
      </div>
    </section>
  );
}

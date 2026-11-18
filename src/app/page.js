'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import SiteHeader from '@/components/sections/SiteHeader';
import HeroSection from '@/components/sections/HeroSection';
import QuoteStripSection from '@/components/sections/QuoteStripSection';
import AboutSection from '@/components/sections/AboutSection';
import FamilyTherapySection from '@/components/sections/FamilyTherapySection';
import SupervisionSection from '@/components/sections/SupervisionSection';
import ServicesSection from '@/components/sections/ServicesSection';
import BookingSection from '@/components/sections/BookingSection';
import FaqSection from '@/components/sections/FaqSection';
import SiteFooter from '@/components/sections/SiteFooter';
import { getFallbackPayload } from '@/lib/defaultData';

export default function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
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
  const familySpecs = specs.slice(0, 2);
  const supervisionSpecs = specs.slice(2);
  const supervisionService =
    services.find((s) => s.category === 'SUPERVISION') || services[services.length - 1];

  return (
    <div className="yarmola-site">
      <SiteHeader profileName={profile.name} />
      <HeroSection profile={profile} />
      <QuoteStripSection />
      <AboutSection profile={profile} />
      <FamilyTherapySection
        specs={familySpecs.length > 0 ? familySpecs : specs}
        onSelectBooking={() => scrollToBooking(services[0]?.id)}
      />
      <SupervisionSection
        specs={supervisionSpecs.length > 0 ? supervisionSpecs : specs}
        onSelectBooking={() => scrollToBooking(supervisionService?.id)}
      />
      <ServicesSection services={services} onSelectBooking={scrollToBooking} />
      <BookingSection
        profile={profile}
        services={services}
        paymentSettings={paymentSettings}
        selectedServiceId={selectedServiceId}
        onSelectService={setSelectedServiceId}
      />
      <FaqSection profileName={profile.name} />
      <SiteFooter
        profile={profile}
        paymentSettings={paymentSettings}
        onOpenLegalDoc={openLegalDoc}
      />

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

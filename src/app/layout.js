import './globals.css';
import prisma from '@/lib/db';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata() {
  try {
    const profile = await prisma.profile.findFirst();
    if (profile) {
      return {
        title: `${profile.name} — ${profile.title}`,
        description: `${profile.subtitle} Онлайн-консультації, сімейна терапія та супервізія для психологів.`,
        openGraph: {
          title: `${profile.name} — Сімейна психологиня та Супервізорка`,
          description: 'Індивідуальна, сімейна терапія та полімодальна супервізія онлайн.',
          images: [{ url: '/avatar_new.png' }],
        },
      };
    }
  } catch (e) {
    console.error('Metadata fallback:', e);
  }

  return {
    title: 'Ярмола Тетяна — Сімейна психологиня та Супервізорка',
    description: 'Онлайн-консультації, сімейна терапія, супервізія та інтервізія.',
    openGraph: {
      title: 'Ярмола Тетяна — Сімейна психологиня',
      description: 'Сімейна психологія, психоаналітичний підхід та супервізія онлайн.',
      images: [{ url: '/avatar_new.png' }],
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}

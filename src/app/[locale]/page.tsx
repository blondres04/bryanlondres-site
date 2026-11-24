import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import {
  About,
  Contact,
  Demo,
  Faq,
  Footer,
  Header,
  Hero,
  HowItWorks,
  Offer,
  Problem,
} from '@/components/sections';

export default async function Home(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Offer />
        <HowItWorks />
        <Demo />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

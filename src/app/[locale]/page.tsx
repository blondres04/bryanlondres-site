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
import { Divider } from '@/components/ui';

export default async function Home(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Divider from="paper" to="bay" />
        <Demo />
        <Divider from="bay" to="paper" />
        <HowItWorks />
        <Offer />
        <About />
        <Faq />
        <Divider from="paper2" to="bay" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Footer, Header } from '@/components/sections';
import { Link } from '@/libs/I18nNavigation';

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'demo' });

  return { title: t('page_title') };
}

export default async function DemoPage(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'demo' });

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-20">
        <h1 className="text-4xl font-extrabold">{t('page_title')}</h1>
        <p className="mt-4 text-muted">{t('page_body')}</p>
        <Link href="/" className="mt-8 inline-block font-semibold text-brand hover:underline">
          {t('back')}
        </Link>
      </main>
      <Footer />
    </>
  );
}

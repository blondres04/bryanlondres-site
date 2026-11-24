import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { DemoForm } from '@/components/demo/DemoForm';
import { Footer, Header } from '@/components/sections';
import { buttonClasses, Container } from '@/components/ui';
import { Link } from '@/libs/I18nNavigation';
import { getRobotsMetadata } from '@/utils/Helpers';

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'demo' });

  return { title: t('page_title'), robots: getRobotsMetadata() };
}

export default async function DemoPage(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'demo' });

  return (
    <>
      <Header />
      <main data-section="demo">
        <div className="border-b border-mango bg-mango-soft">
          <Container className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:gap-4">
            <p className="font-bold tracking-wide text-ink uppercase">{t('banner')}</p>
            <p className="text-sm text-ink">{t('banner_note')}</p>
          </Container>
        </div>
        <Container className="py-10 sm:py-16">
          <h1 className="text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
            {t('page_heading')}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">{t('page_body')}</p>
          <p className="mt-2 max-w-2xl text-sm font-medium text-muted">{t('honest_note')}</p>
          <div className="mt-8">
            <DemoForm />
          </div>

          <aside className="mt-14 rounded-card bg-ink p-6 text-paper sm:p-10">
            <h2 className="text-2xl font-semibold sm:text-3xl">{t('cta_title')}</h2>
            <p className="mt-3 max-w-xl text-lg text-paper/85">{t('cta_body')}</p>
            <Link
              href="/#contact"
              className={`${buttonClasses('primary', 'lg')} mt-5 w-full sm:w-auto`}
            >
              {t('cta_button')}
            </Link>
            <p className="mt-3 text-sm text-paper/80">{t('cta_note')}</p>
          </aside>
          <Link href="/" className="mt-8 inline-block font-semibold text-brand hover:underline">
            {t('back')}
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}

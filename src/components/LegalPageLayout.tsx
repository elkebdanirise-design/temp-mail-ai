import { Helmet } from 'react-helmet-async';
import { AuroraBackground } from '@/components/AuroraBackground';
import { ParticleField } from '@/components/ParticleField';
import { ShootingStars } from '@/components/ShootingStars';
import { BackToHomeButton } from '@/components/BackToHomeButton';
import { BrandLogo } from '@/components/BrandLogo';

type Props = {
  title: string;
  description: string;
  canonicalPath: string;
  h1: string;
  children: React.ReactNode;
  /** When true, adds `noindex, nofollow` meta (useful for private/dynamic pages). */
  noIndex?: boolean;
  /** When true, shows the Temp Mail AI brand unit fixed in the top-right corner. */
  showBrandHeader?: boolean;
};

export const LegalPageLayout = ({
  title,
  description,
  canonicalPath,
  h1,
  children,
  noIndex = false,
  showBrandHeader = false,
}: Props) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}
        <link rel="canonical" href={`https://temp-mail-ai.vercel.app${canonicalPath}`} />
      </Helmet>

      <AuroraBackground />
      <ParticleField />
      <ShootingStars />

      <div className="relative z-10 min-h-screen">
        <BackToHomeButton />

        {showBrandHeader ? (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
            <BrandLogo className="w-10 h-10 sm:w-12 sm:h-12" />
            <span
              className="font-display text-sm sm:text-base font-extrabold"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-magenta)))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Temp Mail AI
            </span>
          </div>
        ) : null}

        <main className="container mx-auto px-4 pt-28 pb-16">
          <article className="glass-panel border-trace mx-auto max-w-3xl p-6 sm:p-8">
            <header className="mb-6">
              <h1
                className="text-2xl sm:text-3xl font-extrabold"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-magenta)))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {h1}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">{description}</p>
            </header>

            <section className="prose prose-invert prose-sm sm:prose-base max-w-none">{children}</section>
          </article>
        </main>
      </div>
    </>
  );
};


import { Helmet } from 'react-helmet-async';
import { AuroraBackground } from '@/components/AuroraBackground';
import { ParticleField } from '@/components/ParticleField';
import { ShootingStars } from '@/components/ShootingStars';
import { BackToHomeButton } from '@/components/BackToHomeButton';

type Props = {
  title: string;
  description: string;
  canonicalPath: string;
  h1: string;
  children: React.ReactNode;
};

export const LegalPageLayout = ({ title, description, canonicalPath, h1, children }: Props) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://tempmail-ai.com${canonicalPath}`} />
      </Helmet>

      <AuroraBackground />
      <ParticleField />
      <ShootingStars />

      <div className="relative z-10 min-h-screen">
        <BackToHomeButton />

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
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                {description}
              </p>
            </header>

            <section className="prose prose-invert prose-sm sm:prose-base max-w-none">
              {children}
            </section>
          </article>
        </main>
      </div>
    </>
  );
};

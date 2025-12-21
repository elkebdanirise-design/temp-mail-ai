import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './PageTransition';
import Index from '@/pages/Index';
import Blog from '@/pages/Blog';
import BlogArticle from '@/pages/BlogArticle';
import NotFound from '@/pages/NotFound';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import Sitemap from '@/pages/Sitemap';

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/blog"
          element={
            <PageTransition>
              <Blog />
            </PageTransition>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <PageTransition>
              <BlogArticle />
            </PageTransition>
          }
        />

        {/* Dedicated footer pages */}
        <Route
          path="/terms"
          element={
            <PageTransition>
              <Terms />
            </PageTransition>
          }
        />
        <Route
          path="/privacy"
          element={
            <PageTransition>
              <Privacy />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/faq"
          element={
            <PageTransition>
              <FAQ />
            </PageTransition>
          }
        />
        <Route
          path="/sitemap"
          element={
            <PageTransition>
              <Sitemap />
            </PageTransition>
          }
        />

        {/* Catch-all */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

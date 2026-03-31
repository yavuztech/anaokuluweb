import styled from 'styled-components';
import { AboutSection } from '../components/public/AboutSection';
import { ContactSection } from '../components/public/ContactSection';
import { GallerySection } from '../components/public/GallerySection';
import { HeroSlider } from '../components/public/HeroSlider';
import { LessonsSection } from '../components/public/LessonsSection';
import { SiteFooter } from '../components/public/SiteFooter';
import { SiteHeader } from '../components/public/SiteHeader';
import { ValuesSection } from '../components/public/ValuesSection';

const PublicPage = styled.div`
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: block;
`;

export function HomePage() {
  return (
    <PublicPage>
      <SiteHeader />
      <MainContent>
        <HeroSlider />
        <AboutSection />
        <ValuesSection />
        <GallerySection />
        <LessonsSection />
        <ContactSection />
      </MainContent>
      <SiteFooter />
    </PublicPage>
  );
}
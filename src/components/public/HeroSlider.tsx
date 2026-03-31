import { useEffect, useState } from 'react';
import { useSiteContent } from '../../hooks/useSiteContent';
import styled from 'styled-components';

const Section = styled.section.attrs({ className: 'hero-section container' })``;
const Copy = styled.div.attrs({ className: 'hero-copy' })``;
const Eyebrow = styled.span.attrs({ className: 'eyebrow' })``;
const Title = styled.h1``;
const Subtitle = styled.p``;
const Actions = styled.div.attrs({ className: 'hero-actions' })``;
const PrimaryLink = styled.a.attrs({ className: 'primary-button' })``;
const SecondaryLink = styled.a.attrs({ className: 'secondary-button' })``;
const Pagination = styled.div.attrs({ className: 'hero-pagination' })``;
const DotButton = styled.button.attrs<{ $active: boolean }>(({ $active }) => ({
  className: $active ? 'hero-dot hero-dot--active' : 'hero-dot',
}))``;
const Visual = styled.div.attrs({ className: 'hero-visual' })``;
const ImageWrap = styled.div.attrs({ className: 'hero-visual__image-wrap' })``;
const Image = styled.img.attrs({ className: 'hero-visual__image' })``;
const QuickCardTop = styled.div.attrs({ className: 'hero-quick-card hero-quick-card--top' })``;
const QuickCardBottom = styled.div.attrs({ className: 'hero-quick-card hero-quick-card--bottom' })``;
const QuickTitle = styled.strong``;
const QuickText = styled.span``;

export function HeroSlider() {
  const { content } = useSiteContent();
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = content.heroSlides;

  useEffect(() => {
    if (slides.length === 0 && activeIndex !== 0) {
      setActiveIndex(0);
    }
  }, [activeIndex, slides.length]);

  useEffect(() => {
    if (slides.length === 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <Section id="hero">
        <Copy>
          <Eyebrow>Oyun temelli egitim</Eyebrow>
          <Title>Icerik eklemek icin admin panelini kullanin.</Title>
          <Subtitle>Slider alaninda hic gorsel yok. Admin panelinden yeni bir gorsel olusturarak bu alani doldurabilirsiniz.</Subtitle>
          <Actions>
            <PrimaryLink href="#iletisim">
              Bizimle Iletisime Gecin
            </PrimaryLink>
          </Actions>
        </Copy>
      </Section>
    );
  }

  const activeSlide = slides[activeIndex];

  return (
    <Section id="hero">
      <Copy>
        <Eyebrow>Oyun temelli egitim</Eyebrow>
        <Title>{activeSlide.title}</Title>
        <Subtitle>{activeSlide.subtitle}</Subtitle>
        <Actions>
          <PrimaryLink href={activeSlide.ctaHref}>
            {activeSlide.ctaLabel}
          </PrimaryLink>
          <SecondaryLink href="#hakkimizda">
            Okulumuzu Kesfedin
          </SecondaryLink>
        </Actions>
        <Pagination aria-label="Slider kontrolu">
          {slides.map((slide, index) => (
            <DotButton
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`${index + 1}. gorsel`}
              $active={index === activeIndex}
            />
          ))}
        </Pagination>
      </Copy>

      <Visual>
        <ImageWrap>
          <Image src={activeSlide.imageUrl} alt={activeSlide.title} />
        </ImageWrap>

        <QuickCardTop>
          <QuickTitle>08:00 - 18:00</QuickTitle>
          <QuickText>Tam gun esnek program</QuickText>
        </QuickCardTop>

        <QuickCardBottom>
          <QuickTitle>{content.contactPhone}</QuickTitle>
          <QuickText>Tanisma gorusmesi icin bizi arayin</QuickText>
        </QuickCardBottom>
      </Visual>
    </Section>
  );
}
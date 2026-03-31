import { useSiteContent } from '../../hooks/useSiteContent';
import styled from 'styled-components';

const Section = styled.section.attrs({ className: 'content-section container' })``;
const Banner = styled.div.attrs({ className: 'contact-banner' })``;
const Intro = styled.div``;
const Tag = styled.span.attrs({ className: 'section-tag' })``;
const Title = styled.h2``;
const Description = styled.p``;
const Details = styled.div.attrs({ className: 'contact-banner__details' })``;
const ContactLink = styled.a``;

export function ContactSection() {
  const { content } = useSiteContent();

  return (
    <Section id="iletisim">
      <Banner>
        <Intro>
          <Tag>Iletisim</Tag>
          <Title>Ailenizi tanimak ve okulumuza davet etmek isteriz.</Title>
          <Description>
            Ziyaret planlamak, kayit surecini ogrenmek veya program detaylarini konusmak icin bize
            ulasin.
          </Description>
        </Intro>

        <Details>
          <ContactLink href={`tel:${content.contactPhone.replace(/\s+/g, '')}`}>{content.contactPhone}</ContactLink>
          <ContactLink href={`mailto:${content.contactEmail}`}>{content.contactEmail}</ContactLink>
        </Details>
      </Banner>
    </Section>
  );
}
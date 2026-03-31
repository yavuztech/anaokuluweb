import { useSiteContent } from '../../hooks/useSiteContent';
import styled from 'styled-components';

const Section = styled.section.attrs({ className: 'content-section container' })``;
const Heading = styled.div.attrs({ className: 'section-heading' })``;
const Tag = styled.span.attrs({ className: 'section-tag' })``;
const Title = styled.h2``;
const Grid = styled.div.attrs({ className: 'gallery-grid' })``;
const Card = styled.article.attrs({ className: 'gallery-card' })``;
const Image = styled.img``;
const Overlay = styled.div.attrs({ className: 'gallery-card__overlay' })``;
const OverlayTitle = styled.strong``;

export function GallerySection() {
  const { content } = useSiteContent();

  return (
    <Section id="galeri">
      <Heading>
        <Tag>Galeri</Tag>
        <Title>Her gune hareket, renk ve birlikte uretme hissi tasiyan anlar.</Title>
      </Heading>

      <Grid>
        {content.gallery.map((item) => (
          <Card key={item.id}>
            <Image src={item.imageUrl} alt={item.title} />
            <Overlay>
              <OverlayTitle>{item.title}</OverlayTitle>
            </Overlay>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
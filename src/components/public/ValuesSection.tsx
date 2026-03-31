import { useSiteContent } from '../../hooks/useSiteContent';
import styled from 'styled-components';

const Section = styled.section.attrs({ className: 'content-section container' })``;
const Heading = styled.div.attrs({ className: 'section-heading' })``;
const Tag = styled.span.attrs({ className: 'section-tag' })``;
const Title = styled.h2``;
const Grid = styled.div.attrs({ className: 'value-grid' })``;
const Card = styled.article.attrs({ className: 'value-card' })``;
const Icon = styled.div.attrs({ className: 'value-card__icon' })``;
const CardTitle = styled.h3``;
const Description = styled.p``;

export function ValuesSection() {
  const { content } = useSiteContent();

  return (
    <Section id="degerler">
      <Heading>
        <Tag>Degerlerimiz</Tag>
        <Title>Cocukluk donemini sakin, keyifli ve ilham veren bir alan olarak kuruyoruz.</Title>
      </Heading>

      <Grid>
        {content.values.map((value) => (
          <Card key={value.id}>
            <Icon>{value.icon}</Icon>
            <CardTitle>{value.title}</CardTitle>
            <Description>{value.description}</Description>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
import { useSiteContent } from '../../hooks/useSiteContent';
import styled from 'styled-components';

const Section = styled.section.attrs({ className: 'content-section container' })``;
const Heading = styled.div.attrs({ className: 'section-heading' })``;
const Tag = styled.span.attrs({ className: 'section-tag' })``;
const Title = styled.h2``;
const Grid = styled.div.attrs({ className: 'lesson-grid' })``;
const Card = styled.article.attrs({ className: 'lesson-card' })<{ $accent: string }>`
  --lesson-accent: ${({ $accent }) => $accent};
`;
const Badge = styled.span.attrs({ className: 'lesson-card__badge' })``;
const CardTitle = styled.h3``;
const Schedule = styled.strong``;
const Description = styled.p``;

export function LessonsSection() {
  const { content } = useSiteContent();

  return (
    <Section id="dersler">
      <Heading>
        <Tag>Dersler</Tag>
        <Title>Yasa uygun ilerleyen programlarimiz, her cocuk icin ayri bir ritim sunar.</Title>
      </Heading>

      <Grid>
        {content.lessons.map((lesson) => (
          <Card key={lesson.id} $accent={lesson.accentColor}>
            <Badge>{lesson.ageGroup}</Badge>
            <CardTitle>{lesson.title}</CardTitle>
            <Schedule>{lesson.schedule}</Schedule>
            <Description>{lesson.description}</Description>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
import { useSiteContent } from '../../hooks/useSiteContent';
import styled from 'styled-components';

const Section = styled.section.attrs({ className: 'content-section container content-section--split' })``;
const Intro = styled.div``;
const Tag = styled.span.attrs({ className: 'section-tag' })``;
const Title = styled.h2``;
const Lead = styled.p.attrs({ className: 'section-lead' })``;
const Panel = styled.div.attrs({ className: 'about-panel' })``;
const Description = styled.p``;
const StatGrid = styled.div.attrs({ className: 'stat-grid' })``;
const StatCard = styled.article.attrs({ className: 'stat-card' })``;
const StatValue = styled.strong``;
const StatLabel = styled.span``;

export function AboutSection() {
  const { content } = useSiteContent();

  return (
    <Section id="hakkimizda">
      <Intro>
        <Tag>Hakkimizda</Tag>
        <Title>{content.about.title}</Title>
        <Lead>{content.about.lead}</Lead>
      </Intro>

      <Panel>
        <Description>{content.about.description}</Description>
        <StatGrid>
          {content.about.stats.map((stat) => (
            <StatCard key={stat.id}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatGrid>
      </Panel>
    </Section>
  );
}
import type { ReactNode } from 'react';
import styled from 'styled-components';

const Section = styled.section.attrs({ className: 'admin-section-shell' })``;
const Header = styled.div.attrs({ className: 'admin-section-shell__header' })``;
const Intro = styled.div``;
const Title = styled.h2``;
const Description = styled.p``;

type AdminSectionShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AdminSectionShell({ title, description, children }: AdminSectionShellProps) {
  return (
    <Section>
      <Header>
        <Intro>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Intro>
      </Header>
      {children}
    </Section>
  );
}
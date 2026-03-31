import { useSiteContent } from '../../hooks/useSiteContent';
import styled from 'styled-components';

const Footer = styled.footer.attrs({ className: 'site-footer' })``;
const Inner = styled.div.attrs({ className: 'container site-footer__inner' })``;
const BrandBlock = styled.div``;
const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
`;
const Logo = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  object-fit: cover;
  box-shadow: 0 8px 18px rgba(37, 50, 74, 0.2);
`;
const BrandName = styled.strong``;
const Tagline = styled.p``;
const Copyright = styled.p``;

export function SiteFooter() {
  const { content } = useSiteContent();

  return (
    <Footer>
      <Inner>
        <BrandBlock>
          <BrandRow>
            <Logo src="/logo.jpg" alt={content.schoolName} loading="lazy" />
            <BrandName>{content.schoolName}</BrandName>
          </BrandRow>
          <Tagline>{content.tagline}</Tagline>
        </BrandBlock>
        <Copyright>{new Date().getFullYear()} - Tum haklari saklidir.</Copyright>
      </Inner>
    </Footer>
  );
}
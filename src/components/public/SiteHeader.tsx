import { useState } from 'react';
import { useSiteContent } from '../../hooks/useSiteContent';
import styled from 'styled-components';

const Header = styled.header.attrs({ className: 'site-header' })``;
const Inner = styled.div.attrs({ className: 'site-header__inner container' })``;
const BrandLink = styled.a.attrs({ className: 'brand-mark' })``;
const BrandLogo = styled.img.attrs({
  className: 'brand-mark__logo',
  src: '/logo.jpg',
  alt: 'ÖZEL DUDULLU BEYAZ ZAMBAK ANAOKULU logosu',
})``;
const BrandText = styled.span``;
const BrandName = styled.strong``;
const BrandTagline = styled.small``;
const Nav = styled.nav``;
const NavLink = styled.a``;
const ToggleButton = styled.button.attrs({ className: 'menu-toggle' })``;
const ToggleLine = styled.span``;

const navItems = [
  { label: 'Hakkimizda', href: '#hakkimizda' },
  { label: 'Degerlerimiz', href: '#degerler' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Dersler', href: '#dersler' },
  { label: 'Iletisim', href: '#iletisim' },
];

export function SiteHeader() {
  const { content } = useSiteContent();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Header>
      <Inner>
        <BrandLink href="#hero" aria-label="Ana sayfaya git">
          <BrandLogo />
          <BrandText>
            <BrandName>{content.schoolName}</BrandName>
            <BrandTagline>{content.tagline}</BrandTagline>
          </BrandText>
        </BrandLink>

        <Nav className={menuOpen ? 'site-nav site-nav--open' : 'site-nav'}>
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </Nav>

        <ToggleButton
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Menuyu ac"
        >
          <ToggleLine />
          <ToggleLine />
          <ToggleLine />
        </ToggleButton>
      </Inner>
    </Header>
  );
}
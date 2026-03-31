import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AdminLoginForm } from '../components/admin/AdminLoginForm';
import { AdminPageSections } from '../components/admin/AdminPageSections';
import { useAdminAuth } from '../hooks/useAdminAuth';

const Page = styled.main`
  padding: 40px 0 72px;
`;

const Topbar = styled.div`
  width: min(1160px, calc(100% - 32px));
  margin: 0 auto 24px;
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 20px;
`;

const Headline = styled.h1`
  margin: 10px 0 0;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ContentWrap = styled.div`
  width: min(1160px, calc(100% - 32px));
  margin: 0 auto;
`;

const InfoBanner = styled.div`
  border-radius: 16px;
  padding: 14px 16px;
  background: rgba(47, 158, 143, 0.12);
  color: var(--text);
`;

const Intro = styled.div``;
const Tag = styled.span.attrs({ className: 'section-tag' })``;
const LogoutButton = styled.button.attrs({ className: 'secondary-button' })``;

export function AdminPage() {
  const { isLoading, logout, user } = useAdminAuth();

  return (
    <Page>
      <Topbar>
        <Intro>
          <Tag>Admin Panel</Tag>
          <Headline>Site Icerik Yonetimi</Headline>
        </Intro>
        <Actions>
          {user && (
            <LogoutButton type="button" onClick={() => void logout()}>
              Cikis Yap
            </LogoutButton>
          )}
          <Link to="/" className="secondary-button secondary-button--dark">
            Siteye Don
          </Link>
        </Actions>
      </Topbar>

      <ContentWrap>
        {isLoading ? <InfoBanner>Oturum kontrol ediliyor...</InfoBanner> : user ? <AdminPageSections /> : <AdminLoginForm />}
      </ContentWrap>
    </Page>
  );
}
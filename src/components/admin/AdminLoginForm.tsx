import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { useSiteContent } from '../../hooks/useSiteContent';

const adminHintEmail = import.meta.env.VITE_ADMIN_HINT_EMAIL || 'admin@example.com';

function getLoginErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return 'Giris yapilirken beklenmeyen bir hata olustu.';
  }

  if (error.message.includes('auth/invalid-credential')) {
    return 'E-posta veya sifre hatali.';
  }

  return error.message;
}

const Card = styled.section`
  border: 1px solid var(--border);
  border-radius: 26px;
  background: var(--surface);
  box-shadow: var(--shadow);
  backdrop-filter: blur(16px);
  padding: 24px;
  display: grid;
  gap: 18px;
`;

const Title = styled.h1`
  margin: 10px 0;
  font-family: 'Baloo 2', cursive;
  font-size: clamp(1.8rem, 3.6vw, 2.5rem);
`;

const Lead = styled.p`
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
`;

const Form = styled.form`
  display: grid;
  gap: 14px;
`;

const Label = styled.label`
  display: grid;
  gap: 8px;
  font-weight: 700;
  color: var(--text);
`;

const TextInput = styled.input`
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.76);
`;

const WarningBanner = styled.div`
  border-radius: 14px;
  padding: 12px 14px;
  background: rgba(255, 194, 77, 0.24);
`;

const ErrorBanner = styled.div`
  border-radius: 14px;
  padding: 12px 14px;
  background: rgba(241, 90, 36, 0.2);
`;

const Intro = styled.div``;
const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const BrandLogo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  object-fit: cover;
  box-shadow: 0 8px 20px rgba(37, 50, 74, 0.2);
`;
const BrandText = styled.strong`
  display: block;
  font-family: 'Baloo 2', cursive;
  font-size: 1.05rem;
`;
const Tag = styled.span.attrs({ className: 'section-tag' })``;
const SubmitButton = styled.button.attrs({ className: 'primary-button' })``;

export function AdminLoginForm() {
  const { login, isConfigured } = useAdminAuth();
  const { content } = useSiteContent();
  const [email, setEmail] = useState(adminHintEmail);
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await login(email, password);
    } catch (nextError) {
      setError(getLoginErrorMessage(nextError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <Intro>
        <BrandRow>
          <BrandLogo src="/logo.jpg" alt={content.schoolName} loading="lazy" />
          <BrandText>{content.schoolName}</BrandText>
        </BrandRow>
        <Tag>Admin Girisi</Tag>
        <Title>Yonetim paneline giris yapin</Title>
        <Lead>Slider, Hakkimizda, Degerlerimiz, Galeri ve Dersler alanlarini yonetmek icin Firebase ile giris yapin.</Lead>
      </Intro>

      {!isConfigured && (
        <WarningBanner>
          Firebase ayarlari tanimli degil. Once .env dosyaniza Firebase proje bilgilerini ekleyin.
        </WarningBanner>
      )}

      <Form onSubmit={handleSubmit}>
        <Label>
          E-posta
          <TextInput type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </Label>
        <Label>
          Sifre
          <TextInput
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Label>
        {error && <ErrorBanner>{error}</ErrorBanner>}
        <SubmitButton type="submit" disabled={isSubmitting || !isConfigured}>
          {isSubmitting ? 'Giris yapiliyor...' : 'Giris Yap'}
        </SubmitButton>
      </Form>
    </Card>
  );
}
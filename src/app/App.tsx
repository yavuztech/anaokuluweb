import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { AdminPage } from '../pages/AdminPage';
import { HomePage } from '../pages/HomePage';

const AppShell = styled.div`
  position: relative;
`;

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </AppShell>
  );
}
import styled from 'styled-components';
import Link from 'next/link';

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 1.5rem;

  @media (min-width: 1024px) {
    padding: 1.25rem 3rem;
  }
`;

export const NavBrand = styled(Link)`
  font-size: 1.125rem;
  font-weight: 800;
  color: #0f172a;
  text-decoration: none;
  letter-spacing: -0.02em;
  transition: color 0.2s ease;

  &:hover {
    color: #6366f1;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const NavLink = styled(Link)<{ $active?: boolean }>`
  font-size: 0.9375rem;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ $active }) => ($active ? '#0f172a' : '#64748b')};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #0f172a;
  }
`;

export const CtaButton = styled.button`
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #0f172a;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1e293b;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;


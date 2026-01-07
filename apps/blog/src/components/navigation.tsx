'use client';

import { usePathname } from 'next/navigation';
import * as S from './navigation.styles';

export function Navigation() {
  const pathname = usePathname();

  return (
    <S.Nav>
      <S.NavContainer>
        <S.NavBrand href="/">
          KONSOLE.BLOG
        </S.NavBrand>

        <S.NavLinks>
          <S.NavLink 
            href="/" 
            $active={pathname === '/'}
          >
            About
          </S.NavLink>
          <S.NavLink 
            href="/articles" 
            $active={pathname.startsWith('/articles') || pathname.startsWith('/posts')}
          >
            Journal
          </S.NavLink>
          <S.CtaButton>
            Let's Talk
          </S.CtaButton>
        </S.NavLinks>
      </S.NavContainer>
    </S.Nav>
  );
}

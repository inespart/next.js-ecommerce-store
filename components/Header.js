import { css } from '@emotion/react';
import Link from 'next/link';
import { primaryColor } from '../pages/_app';

const headerStyles = css`
  display: flex;
  padding: 30px 150px;
  background-color: white;
  font-weight: 300;
  /* position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%; */
`;

const logoContainer = css`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-weight: 500;
  color: ${primaryColor};
  font-size: 1.2rem;

  a {
    text-decoration: none;
    color: ${primaryColor};
  }
`;

const navBarContainer = css`
  display: flex;
  align-items: center;
  margin-left: auto;

  a {
    text-decoration: none;
    color: #001c00;

    :hover {
      font-weight: 500;
    }
  }

  a + a {
    margin-left: 40px;
  }

  img {
    width: 30px;
    height: auto;
  }
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <div css={logoContainer}>
        <Link href="/">
          <a>Die Schreiberei</a>
        </Link>
      </div>
      <div css={navBarContainer}>
        <Link href="/">
          <a>Products</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/shopping-cart">
          <a>
            <img src="/shopping_cart.png" alt="Shopping Cart" />
          </a>
        </Link>
      </div>
    </header>
  );
}

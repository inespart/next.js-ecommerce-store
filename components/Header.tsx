import { css } from '@emotion/react';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import { paddingRightLeftMobile, primaryColor } from '../util/sharedStyles';
import { ShoppingCartItem } from '../util/types';
import HeaderBurger from './HeaderBurger';
import HeaderRightNav from './HeaderRightNav';

const headerStyles = css`
  width: 100%;
  height: 82px;
  padding: 12px 128px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  font-weight: 300;

  @media (max-width: 880px) {
    padding: 32px ${paddingRightLeftMobile};
  }
`;

const logoContainer = css`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-weight: 500;
  color: ${primaryColor};
  font-size: 1.2rem;
  /* padding: 32px 128px; */
  /* width: 100%; */

  a {
    text-decoration: none;
    color: ${primaryColor};
  }
`;

type Props = {
  shoppingCart: ShoppingCartItem[];
  setShoppingCart: Dispatch<
    SetStateAction<
      {
        id: number;
        quantity: number;
      }[]
    >
  >;
};

export default function Header(props: Props) {
  console.log('props insider header', props);
  // useState for the burger menu
  const [open, setOpen] = useState(false);
  return (
    <header css={headerStyles}>
      <div css={logoContainer}>
        <Link href="/">
          <a>Die Schreiberei</a>
        </Link>
      </div>
      <HeaderRightNav
        shoppingCart={props.shoppingCart}
        setShoppingCart={props.setShoppingCart}
        open={open}
      />
      <HeaderBurger open={open} setOpen={setOpen} />
    </header>
  );
}

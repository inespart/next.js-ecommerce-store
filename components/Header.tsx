import { css } from '@emotion/react';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import { primaryColor } from '../util/sharedStyles';
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
    padding: 32px 64px;
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

// const navBarContainer = css`
//   display: flex;
//   align-items: center;
//   margin-left: auto;

//   a {
//     text-decoration: none;
//     color: #001c00;

//     :hover {
//       font-weight: 400;
//     }
//   }

//   a + a {
//     margin-left: 40px;
//   }
// `;

// const shoppingCartContainer = css`
//   display: flex;
//   align-items: center;

//   img {
//     width: 32px;
//     height: auto;
//   }

//   div {
//     display: flex;
//     margin-left: 4px;
//     text-align: center;
//   }

//   .quantityCounter {
//     background-color: white;
//     font-size: ${smallText};
//     padding: 4px;
//     border-radius: 50%;
//     width: 25px;
//     height: 25px;
//     text-align: center;
//     display: inline-block;
//   }
// `;

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
      {/* <div css={navBarContainer}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/products">
          <a>Products</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/shopping-cart">
          <a>
            <div css={shoppingCartContainer} data-cy="cart-icon-in-header">
              <img src="/shopping_cart.png" alt="Shopping Cart" />
            <div className="quantityCounter"> */}
      {/* adding.props #4 */}
      {/* {props.shoppingCart
                  .map((p) => p.quantity)
                  .reduce((total, currentValue) => total + currentValue, 0)}
              </div>
            </div>
          </a>
        </Link>
      </div> */}
    </header>
  );
}

import { css } from '@emotion/react';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { primaryColor } from '../util/sharedStyles';
import { ShoppingCartItem } from '../util/types';
import HeaderRightNav from './HeaderRightNav';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 32px 128px;
  background-color: white;
  font-weight: 300;
  /* position: fixed; */
  top: 0;
  z-index: 1000;
  width: 100%;
`;

const logoContainer = css`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-weight: 500;
  color: ${primaryColor};
  font-size: 1.2rem;
  width: 100%;

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
      />
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
import { css } from '@emotion/react';
import Link from 'next/link';
import { smallText } from '../util/sharedStyles';

const navBarContainer = css`
  display: flex;
  align-items: center;
  margin-left: auto;

  a {
    text-decoration: none;
    color: #001c00;

    @media (max-width: 880px) {
      margin-left: auto;
      padding-bottom: 20px;
    }

    :hover {
      font-weight: 400;
    }
  }

  a + a {
    margin-left: 40px;

    @media (max-width: 880px) {
      margin-left: auto;
    }
  }

  @media (max-width: 880px) {
    flex-flow: column nowrap;
  }
`;

const shoppingCartContainer = css`
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: auto;
  }

  div {
    display: flex;
    margin-left: 4px;
    text-align: center;
  }

  .quantityCounter {
    background-color: white;
    font-size: ${smallText};
    padding: 4px;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    text-align: center;
    display: inline-block;
  }
`;

export default function HeaderRightNav(props) {
  return (
    <div css={navBarContainer}>
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
          <div css={shoppingCartContainer}>
            <img
              src="/shopping_cart.png"
              alt="Shopping Cart"
              data-cy="cart-icon-in-header"
            />
            <div className="quantityCounter">
              {/* adding.props #4 */}
              {props.shoppingCart
                .map((p) => p.quantity)
                .reduce((total, currentValue) => total + currentValue, 0)}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

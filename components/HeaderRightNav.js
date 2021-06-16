import { css } from '@emotion/react';
import Link from 'next/link';
import { darkGrey, primaryColorLight, smallText } from '../util/sharedStyles';

const navBarContainer = (open) => css`
  /* selects the ul */
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  z-index: 1200;

  padding: 0;

  li {
    padding: 16px 24px;
  }

  a {
    text-decoration: none;
    color: ${darkGrey};

    @media (max-width: 880px) {
      padding-bottom: 16px;
    }

    :hover {
      font-weight: 400;
    }
  }

  @media (max-width: 880px) {
    flex-flow: column nowrap;
    background-color: ${primaryColorLight};
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 200px;
    margin-top: 0;
    padding-top: 3rem;
    transform: ${open ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
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
    <ul css={navBarContainer(props.open)}>
      <Link href="/">
        <a>
          <li>Home</li>
        </a>
      </Link>
      <Link href="/products">
        <a>
          {' '}
          <li>Products</li>
        </a>
      </Link>
      <Link href="/about">
        <a>
          <li>About</li>
        </a>
      </Link>
      <Link href="/shopping-cart">
        <a>
          <li>
            <div css={shoppingCartContainer}>
              <img
                src="/shopping_cart.png"
                alt="Shopping Cart"
                data-cy="cart-icon-in-header"
              />
              <div className="quantityCounter">
                {/* adding.propxs #4 */}
                {props.shoppingCart
                  .map((p) => p.quantity)
                  .reduce((total, currentValue) => total + currentValue, 0)}
              </div>
            </div>
          </li>
        </a>
      </Link>
    </ul>
  );
}

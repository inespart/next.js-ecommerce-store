import { css } from '@emotion/react';
import { Dispatch, SetStateAction } from 'react';
import { ShoppingCartItem } from '../util/types';
import Footer from './Footer';
import Header from './Header';

const containerStyles = css``;

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
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <>
      {/* Passing props #3 */}
      <Header
        shoppingCart={props.shoppingCart}
        setShoppingCart={props.setShoppingCart}
      />
      <div css={containerStyles}>{props.children}</div>
      <Footer />
    </>
  );
}

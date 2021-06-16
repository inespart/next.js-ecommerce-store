import { css } from '@emotion/react';
import { Dispatch, SetStateAction } from 'react';
import { ShoppingCartItem } from '../util/types';
import Footer from './Footer';
import Header from './Header';

const containerStyles = css`
  /* padding: 0 150px; */
  /* maybe delete again */
  /* position: relative; */
  /* min-height: 100vh; */
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
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  // console.log('props in layout', props);
  return (
    <>
      {/* Passing props #3 */}
      <Header
        shoppingCart={props.shoppingCart}
        setShoppingCart={props.setShoppingCart}
      />
      <div css={containerStyles}>{props.children}</div>
      {/* {console.log('props inside layout component', props.children)} */}
      <Footer />
    </>
  );
}

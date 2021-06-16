import { css } from '@emotion/react';
import Head from 'next/head';
import { Dispatch, SetStateAction } from 'react';
import Layout from '../components/Layout';
import { ShoppingCartItem } from '../util/types';

const aboutPageContainer = css`
  display: flex;
  flex-direction: column;
  padding: 0 128px;
  width: 70%;

  @media (max-width: 880px) {
    padding: 0 64px;
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

export default function About(props: Props) {
  console.log('props in about page', props);
  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>About</title>
      </Head>
      <h1>About page</h1>
      <div css={aboutPageContainer}>
        Writing and creating visually pleasing art is one of Ines' passions.{' '}
      </div>
    </Layout>
  );
}

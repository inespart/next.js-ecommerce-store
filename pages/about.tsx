import { css } from '@emotion/react';
import Head from 'next/head';
import { Dispatch, SetStateAction } from 'react';
import Layout from '../components/Layout';
import { paddingRightLeftMobile } from '../util/sharedStyles';
import { ShoppingCartItem } from '../util/types';

const aboutPageContainer = css`
  display: flex;
  flex-direction: column;
  padding: 0 128px;
  width: 100%;
  margin-bottom: 16px;
  margin-top: 16px;

  @media (max-width: 880px) {
    padding: 0 ${paddingRightLeftMobile};
  }
`;

const heroStyle = css`
  background-image: url('/painting-drawing.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  height: 60vh;
  width: 100%;
  position: relative;
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
      <div css={heroStyle} />
      <h1>About</h1>
      <div css={aboutPageContainer}>
        <p>
          Die Schreiberei is a (fictional) company that sells handmade and
          unique greeting cards made by Ines.{' '}
        </p>
        <p>
          The company is fictional, because this ecommerce website was built as
          part of a web development course and hence no actual purchases can be
          made.
        </p>
        <p>
          However, hand lettering and creating visually pleasing art is one of
          Ines' passions.
        </p>
        <p>Hope you enjoy this page!</p>
        <p>Best, Ines</p>
      </div>
    </Layout>
  );
}

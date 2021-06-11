import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

const aboutPageContainer = css`
  display: flex;
  flex-direction: column;
  padding: 0 128px;
  width: 70%;
`;

export default function About(props) {
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
        {/* Writing and creating visually pleasing art is one of Ines' passions.{' '} */}
      </div>
    </Layout>
  );
}

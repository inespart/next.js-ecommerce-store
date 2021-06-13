import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const errorPageContainer = css`
  display: flex;
  flex-direction: column;
  padding: 0 128px;
  width: 70%;
  margin-bottom: 64px;
`;

export default function Error(props) {
  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>404 not found</title>
      </Head>
      <h1>Unfortunately this page does not exist</h1>
      <div css={errorPageContainer}>
        <Link href="/">
          <a>
            <button className="button-default">Home</button>
          </a>
        </Link>
      </div>
    </Layout>
  );
}

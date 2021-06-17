import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';

const heroStyle = css`
  background-image: url('/thank-you.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  width: 100%;
  position: relative;
`;

const heroHeadersContainer = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;

  @media (max-width: 880px) {
    width: 40%;
  }

  @media (max-width: 680px) {
    width: 50%;
  }
`;

const heroHeading = css`
  padding-left: 24px;
  padding-right: 24px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  text-align: center;

  h1 {
    margin: 0 0;
    line-height: 96px;

    @media (max-width: 680px) {
      font-size: 2rem;
      line-height: 64px;
    }
  }
`;

const buttonContainer = css`
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 4px;
  text-align: center;

  h1 {
    margin: 0 0;
    line-height: 96px;
  }
`;

export default function ThankYou(props) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header
        shoppingCart={props.shoppingCart}
        setShoppingCart={props.setShoppingCart}
      />

      <div css={heroStyle}>
        <div css={heroHeadersContainer}>
          <div css={heroHeading}>
            <h1>Thank you for your purchase</h1>
          </div>
          <div css={buttonContainer}>
            <Link href="products">
              <a>
                <button className="button-default">Back to Cards</button>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

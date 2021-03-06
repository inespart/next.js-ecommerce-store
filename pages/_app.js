import { css, Global } from '@emotion/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getShoppingCartCookieValue } from '../util/cookies';
import {
  darkGrey,
  normalText,
  paddingRightLeftMobile,
  primaryColor,
  primaryColorLight,
} from '../util/sharedStyles';

export default function MyApp({ Component, pageProps }) {
  // make state variables globally accessible
  const [shoppingCart, setShoppingCart] = useState([]);

  // Updating the state variable after the page loads, so that we don't run into server-side-rendering inconsistencies
  useEffect(() => {
    setShoppingCart(getShoppingCartCookieValue());
  }, []);

  return (
    <>
      <Global
        styles={css`
          *,
          *::after,
          *::before {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            font-family: 'Raleway', sans-serif;
            font-size: ${normalText};
            color: ${darkGrey};
          }
          h1,
          h2,
          h3 {
            font-weight: 500;
          }
          h1 {
            margin: 12px 128px;
            font-size: 3rem;

            @media (max-width: 880px) {
              margin: 12px ${paddingRightLeftMobile};
            }
          }
          h2 {
            margin: 12px 128px;
            font-size: 2rem;
          }
          h3 {
            font-size: 1.5rem;
          }
          h4 {
            font-size: 1.2rem;
          }

          .button-default {
            margin-top: 24px;
            padding: 16px 24px;
            background-color: ${primaryColor};
            border: 1px solid ${primaryColor};
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 8px;
            cursor: pointer;
            color: white;

            :hover {
              background-color: ${primaryColorLight};
            }
          }

          .button-default-ghost {
            margin-top: 24px;
            margin-left: 24px;
            padding: 16px 24px;
            background-color: none;
            border: 1px solid ${primaryColor};
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 8px;
            cursor: pointer;
            color: ${primaryColor};
          }

          .button-small {
            padding: 8px 12px;
            background-color: white;
            border: 1px solid ${primaryColor};
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            cursor: pointer;
            color: ${darkGrey};

            :hover {
              background-color: ${primaryColor};
              border: 1px solid ${primaryColor};
              color: white;
            }
          }

          .button-small-noborder {
            background-color: white;
            border: 1px solid white;
            cursor: pointer;
            color: ${darkGrey};
          }
        `}
      />
      <Head>
        <link icon="favicon" href="favicon.ico" />
      </Head>
      {/* Pass props so they appear in every single page #1 */}
      <Component
        shoppingCart={shoppingCart}
        setShoppingCart={setShoppingCart}
        {...pageProps}
      />
    </>
  );
}

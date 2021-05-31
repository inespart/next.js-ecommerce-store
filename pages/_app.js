import { css, Global } from '@emotion/react';
import Head from 'next/head';

// Color Palette
export const darkGrey = '#001c00';
export const primaryColor = '#b7860b';
export const lightGrey = '#f3f4f6';

// Text sizes
export const normalText = '16px';
export const smallText = '13px';
export const largeText = '19px';

export default function MyApp({ Component, pageProps }) {
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
            margin: 10px 150px;
            font-size: 3rem;
          }
          h2 {
            margin: 10px 150px;
            font-size: 2rem;
          }
          h3 {
            font-size: 1.5rem;
          }
          h4 {
            font-size: 1.2rem;
          }

          .button-default {
            margin-top: 25px;
            padding: 15px 25px;
            background-color: ${primaryColor};
            border: none;
            border-radius: 3px;
            text-transform: uppercase;
            letter-spacing: 7px;
            cursor: pointer;
            color: white;
          }

          .button-small {
            /* margin-top: 25px; */
            padding: 8px 12px;
            background-color: ${primaryColor};
            border: none;
            border-radius: 3px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            cursor: pointer;
            color: white;
          }
        `}
      />
      <Head>
        <link icon="favicon" href="favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

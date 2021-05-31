import { css, Global } from '@emotion/react';
import Head from 'next/head';

// Color Palette
export const darkGrey = '#001c00';
export const primaryColor = '#b7860b';
export const lightGrey = '#f3f4f6';

// Text sizes
export const normalText = '16px';
export const smallText = '13px';

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
          h1 {
            margin: 10px 150px;
            font-size: 3rem;
            font-weight: 500;
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

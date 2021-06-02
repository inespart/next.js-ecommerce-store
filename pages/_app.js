import { css, Global } from '@emotion/react';
import Head from 'next/head';

// Color Palette
export const darkGrey = '#001c00';
export const lightGrey = '#f3f4f6';
export const primaryColor = '#b7860b';
export const primaryColorLight = '#cf980c';

// Text sizes
export const normalText = '16px';
export const smallText = '12px';
export const largeText = '24px';

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
            margin: 12px 128px;
            font-size: 3rem;
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
            border: none;
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 8px;
            cursor: pointer;
            color: white;

            :hover {
              background-color: ${primaryColorLight};
            }
          }

          .button-small {
            /* margin-top: 25px; */
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
        `}
      />
      <Head>
        <link icon="favicon" href="favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

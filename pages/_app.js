import { css, Global } from '@emotion/react';

export const darkGrey = '#001c00';
export const primaryColor = '#b7860b';

export default function MyApp({ Component, pageProps }) {
  return (
    <span>
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
            font-size: 16px;
            color: ${darkGrey};
          }
          h1 {
            font-size: 3rem;
            font-weight: 500;
          }
        `}
      />
      <Component {...pageProps} />
    </span>
  );
}

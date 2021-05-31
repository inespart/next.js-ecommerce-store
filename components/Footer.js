import { css } from '@emotion/react';
import { lightGrey, smallText } from '../pages/_app';

// const footerContainer = css`
//   position: relative;
//   min-height: 100vh;
// `;

const footerStyles = css`
  background-color: ${lightGrey};
  padding: 7px;
  text-align: center;
  font-size: ${smallText};
  /* position: sticky; */
  /* bottom: 0; */
  width: 100%;
`;

export default function Footer() {
  return (
    <div>
      <footer css={footerStyles}>&copy; Ines Part | 2021</footer>
    </div>
  );
}

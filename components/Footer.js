import { css } from '@emotion/react';
import { lightGrey, smallText } from '../util/sharedStyles';

const footerContainer = css`
  width: 100%;
`;

const footerStyles = css`
  background-color: ${lightGrey};
  padding: 7px;
  text-align: center;
  font-size: ${smallText};

  width: 100%;
`;

export default function Footer() {
  return (
    <div css={footerContainer}>
      <footer css={footerStyles}>&copy; Ines Part | 2021</footer>
    </div>
  );
}

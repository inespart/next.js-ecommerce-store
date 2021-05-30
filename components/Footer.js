import { css } from '@emotion/react';
import { smallText } from '../pages/_app';

const footerStyles = css`
  background-color: #f3f4f6;
  padding: 7px;
  text-align: center;
  font-size: ${smallText};
  margin-top: 15px;
`;

export default function Footer() {
  return <footer css={footerStyles}>&copy; Ines Part | 2021</footer>;
}

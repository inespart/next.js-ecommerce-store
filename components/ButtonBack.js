import { css } from '@emotion/react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { paddingRightLeftMobile, primaryColor } from '../util/sharedStyles';

const backStyle = css`
  padding-top: 64px;
  padding-left: 128px;
  padding-right: 128px;

  a {
    text-decoration: none;
    color: ${primaryColor};
  }

  @media (max-width: 880px) {
    padding: 32px ${paddingRightLeftMobile};
  }
`;

export default function ButtonBack() {
  return (
    <div css={backStyle}>
      <Link href="/products">
        <a>
          <FaArrowLeft /> All Cards
        </a>
      </Link>
    </div>
  );
}

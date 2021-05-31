import { css } from '@emotion/react';
import Link from 'next/link';

// import { darkGrey } from '../pages/_app';

const heroStyle = css`
  background-image: url('/heroimage.jpg');
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
  bottom: 30%;
  left: 10%;
  width: 30%;
`;

const heroSubheading = css`
  text-transform: uppercase;
  letter-spacing: 7px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
`;

const heroHeading = css`
  padding-left: 20px;
  padding-right: 20px;
  background-color: rgba(255, 255, 255, 0.9);

  h1 {
    margin: 0 0;
    line-height: 78px;
  }
`;

export default function Hero() {
  return (
    <div css={heroStyle}>
      <div css={heroHeadersContainer}>
        <div css={heroSubheading}>Handmade with love</div>
        <div css={heroHeading}>
          <h1>Unique Greeting Cards for Your Special Occasion</h1>
        </div>
        <Link href="products">
          <a>
            <button className="button-default">Shop Cards</button>
          </a>
        </Link>
      </div>
    </div>
  );
}

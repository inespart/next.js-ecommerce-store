import { css } from '@emotion/react';
import Link from 'next/link';

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

  @media (max-width: 1280px) {
    width: 30%;
  }

  @media (max-width: 880px) {
    bottom: 40%;
  }

  button {
    @media (max-width: 950px) {
      margin-left: 5px;
      margin-right: 5px;
    }

    @media (max-width: 935px) {
    }
  }
`;

const buttonContainer = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const heroSubheading = css`
  text-transform: uppercase;
  letter-spacing: 8px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 12px;
`;

const heroHeading = css`
  padding-left: 24px;
  padding-right: 24px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;

  h1 {
    margin: 0 0;
    line-height: 96px;

    @media (max-width: 1280px) {
      font-size: 2.5rem;
    }

    @media (max-width: 950px) {
      font-size: 2rem;
      line-height: 64px;
    }

    @media (max-width: 700px) {
      font-size: 1.5rem;
      line-height: 58px;
    }
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
        <div css={buttonContainer}>
          <Link href="products">
            <a>
              <button className="button-default">Shop Cards</button>
            </a>
          </Link>
          <Link href="about">
            <a>
              <button className="button-default-ghost">About</button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

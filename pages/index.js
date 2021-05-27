import { css } from '@emotion/react';

const greenBackground = css`
  margin-left: 30px;
  color: white;
  background-color: green;
`;

export default function Home() {
  return <div css={greenBackground}>Hello my friends!</div>;
}

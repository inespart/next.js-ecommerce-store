import { css } from '@emotion/react';
import Footer from './Footer';
import Header from './Header';

const containerStyles = css`
  /* padding: 0 150px; */
  /* maybe delete again */
  position: relative;
  /* min-height: 100vh; */
`;

export default function Layout(props) {
  console.log('props in layout', props);
  return (
    <>
      {/* Passing props #3 */}
      <Header
        shoppingCart={props.shoppingCart}
        setShoppingCart={props.setShoppingCart}
      />
      <div css={containerStyles}>{props.children}</div>
      <Footer />
    </>
  );
}

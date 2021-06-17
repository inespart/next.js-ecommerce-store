import { css } from '@emotion/react';
import Head from 'next/head';
import ButtonBack from '../../components/ButtonBack';
import Layout from '../../components/Layout';
import QuantityButtons from '../../components/QuantityButtons';
import { addItemByProductId, parseCookieValue } from '../../util/cookies';
import { paddingRightLeftMobile } from '../../util/sharedStyles';
import { largeText } from '../_app';

const productContainer = css`
  padding-left: 128px;
  padding-right: 128px;
  padding-top: 64px;
  padding-bottom: 96px;
  display: flex;
  flex-direction: row;

  @media (max-width: 1100px) {
    padding: 32px ${paddingRightLeftMobile};
    flex-direction: column;
    align-items: center;
  }
`;

const imageContainer = css`
  display: flex;
  width: 50%;

  img {
    width: 100%;
    height: auto;
    filter: drop-shadow(2px 4px 8px #585858);

    @media (max-width: 880px) {
      width: 200px;
      height: 160px;
    }
  }
`;

const descriptionContainer = css`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;

  div {
    font-size: ${largeText};
    margin: 16px 0;
  }

  h2 {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 4px;
  }

  span:first-of-type {
    margin-top: 32px;
  }
`;

const quantityContainer = css`
  margin-top: 48px;
  button {
    margin: 0 8px;
  }
`;

export default function SingleProduct(props) {
  const quantity = props.shoppingCart.find(
    (product) => product.id === props.product.id,
  )?.quantity;

  return (
    // Pass props #2
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>{props.product.productName}</title>
      </Head>
      <ButtonBack />

      <div css={productContainer}>
        <div css={imageContainer}>
          <img src={props.product.src} alt={props.product.productName} />
        </div>
        <div css={descriptionContainer}>
          <h2>{props.product.productName}</h2>
          <div>EUR {(props.product.price / 100).toFixed(2)}</div>
          <div> {props.product.productDescription}</div>
          <button
            data-cy="add-to-cart"
            className="button-default"
            onClick={() => {
              props.setShoppingCart(addItemByProductId(props.product.id));
            }}
          >
            Add to cart
          </button>
          <div css={quantityContainer}>
            {quantity > 0 ? (
              <QuantityButtons
                quantity={quantity}
                setShoppingCart={props.setShoppingCart}
                productId={props.product.id}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Create connection to database
export async function getServerSideProps(context) {
  // productId comes from the file name [productId].js
  const productId = context.query.productId;

  // changed products for getProductById - first PostgreSQL lecture
  const { getProductById } = await import('../../util/database');

  const product = await getProductById(productId);

  return {
    props: {
      product: product,
      // Passing a cookie value as a prop
      quantity: parseCookieValue(context.req.cookies.shoppingCart) || [],
    },
  };
}

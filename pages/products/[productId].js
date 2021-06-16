import { css } from '@emotion/react';
import Head from 'next/head';
import ButtonBack from '../../components/ButtonBack';
import Layout from '../../components/Layout';
import QuantityButtons from '../../components/QuantityButtons';
import { addItemByProductId, parseCookieValue } from '../../util/cookies';
import { largeText } from '../_app';

// import { useRouter } from 'next/router';

const productContainer = css`
  padding-left: 128px;
  padding-right: 128px;
  padding-top: 64px;
  padding-bottom: 96px;
  display: flex;

  @media (max-width: 880px) {
    padding-left: 64px;
    padding-right: 64px;
  }
`;

const imageContainer = css`
  display: flex;
  width: 50%;

  img {
    width: 100%;
    height: auto;
    filter: drop-shadow(2px 4px 8px #585858);
  }
`;

const descriptionContainer = css`
  display: flex;
  width: 50%;
  flex-direction: column;
  /* justify-content: center; */
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
  // console.log('---props---', props);
  // console.log('context', props.quantity);
  // const router = useRouter();
  // const { productId } = router.query;

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
      {/* <h1>{props.product.productName}</h1> */}

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
              // using the js-cookie library to set and get cookies
              // use useState to update quantity on frontend
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
  // console.log(context.query);
  const productId = context.query.productId;
  // console.log('---productId---', productId);
  // console.log('---cookies---', context.req.cookies);

  // changed products for getProductById - first PostgreSQL lecture
  const { getProductById } = await import('../../util/database');

  // // Now we don't need to .find in JS anymore - SQL does it
  // const product = products.find((p) => p.id === productId);

  const product = await getProductById(productId);

  return {
    props: {
      product: product,
      // Passing a cookie value as a prop
      quantity: parseCookieValue(context.req.cookies.shoppingCart) || [],
    },
  };
}

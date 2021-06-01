import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import {
  addItemByProductId,
  getQuantityCookieValue,
  parseCookieValue,
} from '../../util/cookies';
import { largeText } from '../_app';

// import { useRouter } from 'next/router';

const productContainer = css`
  padding: 128px 128px;
  display: flex;
  background: radial-gradient(#f3f4f6, #fff);
`;

const imageContainer = css`
  display: flex;
  width: 50%;

  img {
    width: 100%;
    height: auto;
    box-shadow: 3px 3px 5px 6px #ccc;
  }
`;

const descriptionContainer = css`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    font-size: ${largeText};
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

export default function SingleProduct(props) {
  console.log('---props---', props);
  // console.log('context', props.quantity);

  // const router = useRouter();
  // const { productId } = router.query;
  return (
    <Layout>
      <Head>
        <title>{props.product.productName}</title>
      </Head>
      {/* <h1>{props.product.productName}</h1> */}
      <div css={productContainer}>
        <div css={imageContainer}>
          <img src={props.product.src} alt={props.product.productName} />
        </div>
        <div css={descriptionContainer}>
          <h2>{props.product.productName}</h2>
          <div>EUR {props.product.price}</div>
          <span>Handmade</span>
          <span>Unique</span>
          <button
            className="button-default"
            onClick={() => {
              // using the js-cookie library to set and get cookies
              addItemByProductId(props.product.id);
            }}
          >
            Add to cart
          </button>
          {
            // Karl removed getQuantityCookieValue() and replaced it with props.quantity (maybe because we used cookies as props below?)
            props.quantity.find((product) => product.id === props.product.id)
              ?.quantity
          }
        </div>
      </div>
    </Layout>
  );
}

// Create connection to database
export async function getServerSideProps(context) {
  // productId comes from the file name [productId].js
  const productId = context.query.productId;
  console.log('---productId---', productId);
  console.log('---cookies---', context.req.cookies);
  const { products } = await import('../../util/database');
  const product = products.find((p) => p.id === productId);

  return {
    props: {
      product: product,
      // Passing a cookie value as a prop
      quantity: parseCookieValue(context.req.cookies.quantity) || [],
    },
  };
}

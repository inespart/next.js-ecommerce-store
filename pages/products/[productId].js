import { css } from '@emotion/react';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { largeText } from '../_app';

const productContainer = css`
  padding: 120px 150px;
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
    letter-spacing: 3px;
  }

  span:first-of-type {
    margin-top: 35px;
  }
`;

export default function SingleProduct(props) {
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
          <button className="button-default">Add to cart</button>
        </div>
      </div>
    </Layout>
  );
}

// Create connection to database
export async function getServerSideProps(context) {
  // productId comes from the file name [productId].js
  const productId = context.query.productId;
  console.log('productId', productId);
  const { products } = await import('../../util/database');
  const product = products.find((p) => p.id === productId);

  return {
    props: {
      product: product,
    },
  };
}

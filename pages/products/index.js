import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { darkGrey, smallText } from '../_app';

// Array of products was copy pasted to database.js

const containerStyle = css`
  padding: 30px 150px;
  width: 100vw;
  display: flex;
  flex-flow: row wrap;
  align-content: space-between;
  justify-content: space-between;
`;

const productThumbStyle = css`
  width: 450px;
  height: 500px;
  margin: 10px;
  font-weight: 300;

  img {
    width: 100%;
    height: auto;
    box-shadow: 3px 3px 5px 6px #ccc;
    margin-bottom: 10px;
  }

  h4 {
    margin-top: 10px;
    margin-bottom: 5px;
    font-weight: 400;
  }

  .price {
    margin-bottom: 15px;
    font-size: ${smallText};
  }

  a {
    color: ${darkGrey};

    :hover {
      font-weight: 400;
    }
  }
`;

const moreInfoContainer = css`
  display: flex;
  align-items: center;
`;

const buttonContainer = css`
  display: flex;
  margin-left: auto;
`;

// Props will come from GetServerSide below
export default function Products(props) {
  console.log('props', props);
  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>

      <h1>Products</h1>
      <div css={containerStyle}>
        {props.products.map((product) => {
          return (
            <div key={`product-${product.id}`} css={productThumbStyle}>
              <img src={product.src} alt={product.productName} />
              <br />

              <span>
                <h4>{product.productName}</h4>
                <div className="price">EUR {product.price}</div>
                <div css={moreInfoContainer}>
                  <div>
                    <Link href={`products/${product.id}`}>
                      <a>Learn More</a>
                    </Link>{' '}
                  </div>
                  <div css={buttonContainer}>
                    <button className="button-small">+ Add to cart</button>
                  </div>
                </div>
              </span>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

// This code will only run on the server
export async function getServerSideProps() {
  // Allows us to import inside of a function
  const { products } = await import('../../util/database');
  // This console.log will only show up in Node.js
  console.log('products', products);
  // These props will show up in line 13 only on this page
  return {
    props: {
      products: products,
    },
  };
}

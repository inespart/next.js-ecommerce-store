import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import Layout from '../../components/Layout';
import { addItemByProductId } from '../../util/cookies';
import { primaryColor, smallText } from '../../util/sharedStyles';
import { ShoppingCartItem } from '../../util/types';

// Array of products was copy pasted to database.js

const containerStyle = css`
  padding: 32px 128px;
  width: 100vw;
  display: flex;
  flex-flow: row wrap;
  align-content: space-between;
  justify-content: space-between;
`;

const productThumbStyle = css`
  width: 300px;
  height: 400px;
  margin: 10px;
  font-weight: 300;

  img {
    width: 100%;
    height: auto;
    filter: drop-shadow(2px 4px 8px #585858);
    margin-bottom: 12px;
  }

  h4 {
    margin-top: 12px;
    margin-bottom: 4px;
    font-weight: 400;
  }

  .price {
    margin-bottom: 16px;
    font-size: ${smallText};
  }

  a {
    color: ${primaryColor};
    text-decoration: none;

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

// Typescript

type ProductObject = {
  id: number;
  productName: string;
  src: string;
  productDescription: string;
  price: string;
};

type Props = {
  shoppingCart: ShoppingCartItem[];
  setShoppingCart: Dispatch<
    SetStateAction<
      {
        id: number;
        quantity: number;
      }[]
    >
  >;
  // we are having an array of this particular type of object
  products: ProductObject[];
};

// Props will come from GetServerSide below
export default function Products(props: Props) {
  console.log('props in gssp', props);
  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>Products</title>
      </Head>

      <h1>Products</h1>
      <div css={containerStyle}>
        {props.products.map((product) => {
          return (
            <div key={`product-${product.id}`} css={productThumbStyle}>
              <Link href={`products/${product.id}`}>
                <a data-cy="single-product-link">
                  <img src={product.src} alt={product.productName} />
                </a>
              </Link>
              <br />

              <span>
                <h4>{product.productName}</h4>
                <div className="price">
                  EUR {(parseFloat(product.price) / 100).toFixed(2)}
                </div>
                <div css={moreInfoContainer}>
                  <div>
                    <Link href={`products/${product.id}`}>
                      <a>Learn More</a>
                    </Link>{' '}
                  </div>
                  <div css={buttonContainer}>
                    <button
                      className="button-small"
                      onClick={() => {
                        // using the js-cookie library to set and get cookies
                        props.setShoppingCart(addItemByProductId(product.id));
                      }}
                    >
                      + Add to cart
                    </button>
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
  // changed products for getProducts - first PostgreSQL lecture
  const { getProducts } = await import('../../util/database');
  const products = await getProducts();
  // This console.log will only show up in Node.js
  console.log('products', products);

  // These props will show up as props to the function Products(props) only on this page
  return {
    props: {
      products: products,
    },
  };
}

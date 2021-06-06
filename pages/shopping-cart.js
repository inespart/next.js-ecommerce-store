import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { lightGrey } from '../util/sharedStyles';

const shoppingCartContainer = css`
  display: flex;
`;

const shoppingCartItemsContainer = css`
  display: flex;
  flex-direction: column;
  padding: 0 128px;
  width: 70%;
`;

const productContainer = css`
  margin: 24px 0;
  padding: 10px 10px;
  /* background-color: ${lightGrey}; */
  border: 1px solid ${lightGrey};
  border-radius: 8px;
  display: flex;
  align-items: flex-start;

  img {
    width: 192px;
    height: auto;
    margin-right: 64px;
  }

  button {
    margin: 0 8px;
  }
`;

const totalSumContainer = css`
  display: flex;
  flex-direction: column;
  width: 20%;
`;

export default function ShoppingCart(props) {
  // retrieve array of product ids that are inside shopping cart
  const productsByIdInShoppingCart = props.shoppingCart.map((p) => p.id);
  console.log('---productsByIdInShoppingCart---', productsByIdInShoppingCart);

  // filter all products (array of objects) and return an array ob objects of only those that are inside shopping cart
  const productsInShoppingCart = props.products.filter((p) =>
    productsByIdInShoppingCart.includes(p.id),
  );
  console.log('---productsInShoppingCart---', productsInShoppingCart);

  // // retrieve array of quantities of products inside shopping cart
  // const quantityOfProductsInShoppingCart = props.shoppingCart.map(
  //   (p) => p.quantity,
  // );
  // console.log(
  //   '---quantityOfProductsInShoppingCart---',
  //   quantityOfProductsInShoppingCart,
  // );

  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <h1>Shopping Cart</h1>
      <div css={shoppingCartContainer}>
        <div css={shoppingCartItemsContainer}>
          <h3>Products inside shopping cart:</h3>
          {productsInShoppingCart.map((p) => {
            return (
              <div css={productContainer} key={`product-${p.id}`}>
                <div>
                  <img src={p.src} alt={p.productName} />
                </div>
                <div>
                  <h4>{p.productName}</h4>
                  <p>EUR {p.price}</p>
                  <p>
                    Quantity: <button className="button-small">-</button>
                    {
                      props.shoppingCart.find((pro) => pro.id === p.id)
                        ?.quantity
                    }{' '}
                    <button className="button-small">+</button>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div css={totalSumContainer}>
          <h3>
            Total Sum (
            {props.shoppingCart
              .map((p) => p.quantity)
              .reduce((total, currentValue) => total + currentValue, 0)}{' '}
            items):
          </h3>
          <div>EUR {}</div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  // changed products for getProducts after PostgreSQL lecture
  const { getProducts } = await import('../util/database');

  return {
    props: {
      products,
    },
  };
}

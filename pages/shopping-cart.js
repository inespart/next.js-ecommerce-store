import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Layout from '../components/Layout';
import {
  addItemByProductId,
  removeItemByProductId,
  subtractItemByProductId,
} from '../util/cookies';
import { lightGrey, primaryColor, smallText } from '../util/sharedStyles';

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

  span {
    font-size: ${smallText};
    color: ${primaryColor};
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: ${primaryColor};
  }
`;

const totalSumContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 90%;
  padding: 24px;
  margin-top: 24px;
  margin-bottom: 24px;
  background-color: ${lightGrey};
  border: 1px solid ${lightGrey};
  border-radius: 8px;

  button {
    justify-content: center;
    align-items: center;
  }
`;

const emptyCartContainer = css`
  display: flex;
  flex-direction: column;

  h2 {
    margin-top: 64px;
  }

  button {
    margin-left: 128px;
    margin-bottom: 128px;
  }
`;

export default function ShoppingCart(props) {
  const [finalShoppingCartArray, setFinalShoppingCartArray] = useState(
    props.finalShoppingCartArray,
  );

  const quantity = props.shoppingCart
    .map((p) => p.quantity)
    .reduce((total, currentValue) => total + currentValue, 0);

  // // retrieve array of product ids that are inside shopping cart
  // const productsByIdInShoppingCart = props.shoppingCart.map((p) => p.id);
  // // console.log('---productsByIdInShoppingCart---', productsByIdInShoppingCart);

  // // filter all products (array of objects) and return an array of objects of only those that are inside shopping cart
  // const productsInShoppingCart = props.products.filter((p) =>
  //   productsByIdInShoppingCart.includes(p.id),
  // );
  // // console.log('---productsInShoppingCart---', productsInShoppingCart);

  // calculate the total sum of products inside shopping cart
  const totalSum = finalShoppingCartArray
    .reduce((acc, product) => {
      // need parseFloat to transform string into number
      return acc + parseFloat(product.price / 100) * product.quantity;
    }, 0)
    .toFixed(2);

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
        {totalSum > 0 ? (
          <>
            <div css={shoppingCartItemsContainer}>
              {/* Products inside shopping cart */}
              {finalShoppingCartArray.map((p) => {
                return (
                  <div css={productContainer} key={`product-${p.id}`}>
                    <div>
                      <Link href={`products/${p.id}`}>
                        <a>
                          <img src={p.src} alt={p.productName} />
                        </a>
                      </Link>
                    </div>
                    <div>
                      <Link href={`products/${p.id}`}>
                        <a>
                          <h4>{p.productName}</h4>
                        </a>
                      </Link>
                      <p>EUR {(p.price / 100).toFixed(2)}</p>
                      <p>
                        Quantity:
                        {/* Minus Button */}
                        <button
                          className="button-small"
                          onClick={() => {
                            props.setShoppingCart(
                              subtractItemByProductId(p.id),
                            );
                            setFinalShoppingCartArray(
                              finalShoppingCartArray.map((prod) => {
                                if (prod.id === p.id) {
                                  return {
                                    ...prod,
                                    quantity: prod.quantity - 1,
                                  };
                                } else {
                                  return prod;
                                }
                              }),
                            );
                          }}
                        >
                          -
                        </button>
                        {/*  Quantity - Number of items in the cart*/}
                        {
                          props.shoppingCart.find(
                            (product) => product.id === p.id,
                          )?.quantity
                        }{' '}
                        {/* Plus Button */}
                        <button
                          className="button-small"
                          onClick={() => {
                            console.log(props.shoppingCart);
                            // this updates the cookie state
                            props.setShoppingCart(addItemByProductId(p.id));
                            // this updates the quantity on the frontend
                            setFinalShoppingCartArray(
                              finalShoppingCartArray.map((prod) => {
                                if (prod.id === p.id) {
                                  // console.log(
                                  //   'prod inside finalShoppingCartArray',
                                  //   prod,
                                  // );
                                  return {
                                    ...prod,
                                    quantity: prod.quantity + 1,
                                  };
                                } else {
                                  return prod;
                                }
                              }),
                            );
                          }}
                        >
                          +
                        </button>
                        <button
                          className="button-small-noborder"
                          onClick={() => {
                            props.setShoppingCart(removeItemByProductId(p.id));
                            setFinalShoppingCartArray(
                              finalShoppingCartArray.filter(
                                (prod) => prod.id !== p.id,
                              ),
                            );
                          }}
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div css={totalSumContainer}>
              <h3>
                Total Sum ({quantity} {quantity > 1 ? 'items' : 'item'}):
                <br />
                <br /> {totalSum} €
              </h3>
              <br />
              <Link href="/checkout">
                <a>
                  <button className="button-default">Checkout</button>
                </a>
              </Link>
            </div>
          </>
        ) : (
          <div css={emptyCartContainer}>
            <div>
              <h2>There are no items in your shopping cart.</h2>
            </div>

            <div>
              <Link href="products">
                <a>
                  <button className="button-default">Shop Cards</button>
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // changed products for getProducts after PostgreSQL lecture
  const { getProducts } = await import('../util/database');
  const products = await getProducts();

  // functionality to combine needed data from 2 arrays into a third array
  const rawCookie = context.req.cookies.shoppingCart;
  const cookieArray = rawCookie ? JSON.parse(rawCookie) : [];
  // console.log('cookieArray', cookieArray);

  // map over the cookieArray and find the product inside products array with the same ID as in cookieArray;
  // save the result (object) in draftShoppingCartObject;
  // return a new object with the properties id, produtName,...
  const finalShoppingCartArray = cookieArray.map((p) => {
    const draftShoppingCartObject = products.find((prod) => prod.id === p.id);
    console.log('draftShoppingCartObject', draftShoppingCartObject);
    return {
      id: draftShoppingCartObject.id,
      productName: draftShoppingCartObject.productName,
      src: draftShoppingCartObject.src,
      price: draftShoppingCartObject.price,
      quantity: p.quantity,
    };
  });

  console.log('finalShoppingCartArray', finalShoppingCartArray);

  // return the finalShoppingCartArray as props
  return {
    props: {
      products,
      finalShoppingCartArray,
    },
  };
}

import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Layout from '../components/Layout';
import {
  addItemByProductId,
  removeItemByProductId,
  subtractItemByProductId,
} from '../util/cookies';
import {
  lightGrey,
  paddingRightLeftMobile,
  primaryColor,
  smallText,
} from '../util/sharedStyles';
import { calculateTotalQuantity } from '../util/totalQuantity';
import { calculateTotalSum } from '../util/totalSum';

const shoppingCartContainer = css`
  display: flex;
  flex-direction: row;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const shoppingCartItemsContainer = css`
  display: flex;
  flex-direction: column;
  padding: 0 128px;
  width: 70%;

  @media (max-width: 1100px) {
    width: 100%;
  }

  @media (max-width: 880px) {
    padding: 0 ${paddingRightLeftMobile};
  }
`;

const productContainer = css`
  margin: 24px 0;
  padding: 10px 10px;
  border: 1px solid ${lightGrey};
  border-radius: 8px;
  display: flex;
  align-items: flex-start;

  @media (max-width: 880px) {
    padding: 10px 0;
  }

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

const imageContainer = css`
  display: flex;

  img {
    @media (max-width: 880px) {
      width: 80%;
    }
  }
  @media (max-width: 880px) {
    width: 45%;
  }
`;

const detailsContainer = css`
  @media (max-width: 880px) {
    width: 55%;
    padding-right: 6px;
  }
`;

const quantityContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 880px) {
    flex-direction: column;
    align-items: flex-start;
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

  @media (max-width: 1100px) {
    margin: 24px 128px;
    width: 70%;
    align-self: center;
  }

  @media (max-width: 880px) {
    margin-left: ${paddingRightLeftMobile};
    margin-right: ${paddingRightLeftMobile};
    width: 90%;
  }

  button {
    justify-content: center;
    align-items: center;
  }
`;

const emptyCartContainer = css`
  display: flex;
  flex-direction: column;

  @media (max-width: 880px) {
    margin-left: ${paddingRightLeftMobile};
    margin-right: ${paddingRightLeftMobile};
    width: 90%;
  }

  h2 {
    margin-top: 64px;

    @media (max-width: 880px) {
      margin-left: 0;
      margin-right: 0;
    }
  }

  button {
    margin-left: 128px;
    margin-bottom: 128px;

    @media (max-width: 880px) {
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

export default function ShoppingCart(props) {
  const [finalShoppingCartArray, setFinalShoppingCartArray] = useState(
    props.finalShoppingCartArray,
  );

  useEffect(() => {
    // [
    // {id: 1, quantity: 2, price: 590, src:"/", productName: ""},
    // {id: 2, quantity: 1, price: 590, src:"/", productName: ""}
    // ]
    const newFinalShoppingCartArray = props.finalShoppingCartArray
      // filter out all objects with a quantity below 1
      .filter((pro) => {
        const isInSubtractedValue = props.shoppingCart.find((item) => {
          return pro.id === item.id;
        });
        return isInSubtractedValue;
      })
      // update the quantity of objects inside newFinalShoppingCartArray with the quantity inside subtractedValue
      .map((pro) => {
        const q = props.shoppingCart.find((item) => {
          return item.id === pro.id;
        }).quantity;

        pro.quantity = q;
        return pro;
      });
    setFinalShoppingCartArray(newFinalShoppingCartArray);
    // if either of these things changes, then it will update the finalShoppingCart
  }, [props.finalShoppingCartArray, props.shoppingCart]);

  const quantity = calculateTotalQuantity(props.shoppingCart);

  // calculate the total sum of products inside shopping cart
  const totalSum = calculateTotalSum(finalShoppingCartArray);

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
                    <div css={imageContainer}>
                      <Link href={`products/${p.id}`}>
                        <a>
                          <img src={p.src} alt={p.productName} />
                        </a>
                      </Link>
                    </div>
                    <div css={detailsContainer}>
                      <Link href={`products/${p.id}`}>
                        <a>
                          <h4>{p.productName}</h4>
                        </a>
                      </Link>
                      <p>EUR {(p.price / 100).toFixed(2)}</p>
                      <div css={quantityContainer}>
                        <div>Quantity:</div>
                        {/* Minus Button */}
                        <div>
                          <button
                            className="button-small"
                            onClick={() => {
                              // [{id: 1, quantity: 2}]
                              const subtractedValue = subtractItemByProductId(
                                p.id,
                              );
                              props.setShoppingCart(subtractedValue);
                            }}
                          >
                            -
                          </button>
                          {/*  Quantity - Number of items in the cart*/}
                          {
                            finalShoppingCartArray.find(
                              (product) => product.id === p.id,
                            )?.quantity
                          }{' '}
                          {/* Plus Button */}
                          <button
                            className="button-small"
                            onClick={() => {
                              console.log(
                                'props.shoppingCart',
                                props.shoppingCart,
                              );
                              // this updates the cookie state
                              props.setShoppingCart(addItemByProductId(p.id));
                            }}
                          >
                            +
                          </button>
                          <button
                            className="button-small-noborder"
                            onClick={() => {
                              props.setShoppingCart(
                                removeItemByProductId(p.id),
                              );
                              setFinalShoppingCartArray(
                                finalShoppingCartArray.filter(
                                  (prod) => prod.id !== p.id,
                                ),
                              );
                            }}
                          >
                            <RiDeleteBin6Line aria-label="Delete element from shopping cart" />
                          </button>
                        </div>
                      </div>
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
                  <button
                    data-cy="checkout-button-on-shoppingcart-page"
                    className="button-default"
                  >
                    Checkout
                  </button>
                </a>
              </Link>
            </div>
          </>
        ) : (
          <div css={emptyCartContainer}>
            <h2>There are no items in your shopping cart.</h2>

            <Link href="products">
              <a>
                <button className="button-default">Shop Cards</button>
              </a>
            </Link>
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

  // map over the cookieArray and find the product inside products array with the same ID as in cookieArray;
  // save the result (object) in draftShoppingCartObject;
  // return a new object with the properties id, produtName,...
  const finalShoppingCartArray = cookieArray.map((p) => {
    const draftShoppingCartObject = products.find((prod) => prod.id === p.id);
    return {
      id: draftShoppingCartObject.id,
      productName: draftShoppingCartObject.productName,
      src: draftShoppingCartObject.src,
      price: draftShoppingCartObject.price,
      quantity: p.quantity,
    };
  });

  // return the finalShoppingCartArray as props
  return {
    props: {
      products,
      finalShoppingCartArray,
    },
  };
}

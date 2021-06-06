import Head from 'next/head';
import Layout from '../components/Layout';

export default function ShoppingCart(props) {
  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <h1>Shopping Cart Page</h1>
      {/* <div>{props.shoppingCart.map((p) => p.quantity)}</div> */}
    </Layout>
  );
}

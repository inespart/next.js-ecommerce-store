import Head from 'next/head';
import Layout from '../components/Layout';

export default function About(props) {
  console.log('props in about page', props);
  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>About</title>
      </Head>
      <h1>About page</h1>
    </Layout>
  );
}

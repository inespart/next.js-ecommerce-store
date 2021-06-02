import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header
        shoppingCart={props.shoppingCart}
        setShoppingCart={props.setShoppingCart}
      />
      <Hero />
      <Footer />
    </>
  );
}

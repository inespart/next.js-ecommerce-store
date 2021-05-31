import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Hero />
      <div>
        HelloHelloHelloHelloHelloHello
        HelloHelloHelloHelloHelloHelloHelloHelloHello
      </div>
      <Footer />
    </>
  );
}

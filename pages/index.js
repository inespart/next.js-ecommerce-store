import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <>
      <Header />
      <Head>
        <title>Home</title>
      </Head>
      <Hero />
      <Footer />
    </>
  );
}

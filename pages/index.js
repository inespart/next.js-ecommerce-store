import Head from 'next/head';
import Hero from '../components/Hero';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <Hero />
    </Layout>
  );
}

import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function One() {
  const router = useRouter();
  const { productId } = router.query;
  return (
    <Layout>
      <Head>
        <title>{productId}</title>
      </Head>
      <h1>{productId}</h1>
    </Layout>
  );
}

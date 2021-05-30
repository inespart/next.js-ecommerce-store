import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

// Array of products
const products = [
  { id: 1, productName: 'Happy birthday 30', price: '5,90' },
  { id: 2, productName: 'Merry Christmas', price: '4,90' },
  { id: 3, productName: 'Well done', price: '4,90' },
];

export default function Products() {
  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>

      <div>
        <h1>Products</h1>
        {products.map((product) => {
          return (
            <div key={`product-${product.id}`}>
              <Link href={`products/${product.id}`}>
                <a>{product.productName}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

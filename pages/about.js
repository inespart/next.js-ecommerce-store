import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { lightGrey } from './_app';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <h1>About page</h1>
    </Layout>
  );
}

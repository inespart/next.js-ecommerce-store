import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

// export const products = [
//   {
//     id: '1',
//     productName: 'Happy birthday 30',
//     price: '5,90',
//     src: '/happy_30_transparent.png',
//   },
//   {
//     id: '2',
//     productName: 'Merry Christmas',
//     price: '4,90',
//     src: '/merry_christmas_transparent.png',
//   },
//   {
//     id: '3',
//     productName: 'Well done',
//     price: '4,90',
//     src: '/coming-soon.jpg',
//   },
//   {
//     id: '4',
//     productName: 'Congratulations',
//     price: '4,90',
//     src: '/congratulations_transparent.png',
//   },
// ];

// Read the PostgreSQL secret connection information
dotenvSafe.config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

// Perform a first query
export async function getProducts() {
  const products = await sql`SELECT * FROM products`;
  return products.map((product) => camelcaseKeys(product));
}

export async function getProductById(id) {
  const products = await sql`SELECT * FROM products WHERE id = ${id}`;
  return products.map((product) => camelcaseKeys(product))[0];
}

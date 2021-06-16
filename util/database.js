import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

// Read the PostgreSQL secret connection information
dotenvSafe.config();

// Connect to PostgreSQL over SSL when in "production" environments such as Heroku
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

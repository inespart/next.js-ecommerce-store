const setPostgresDefaultsOnHeroku = require('./util/setPostgresDefaultsOnHeroku');

setPostgresDefaultsOnHeroku();

// Configure SSL database connections

const options = {};

if (process.env.NODE_ENV === 'production') {
  options.ssl = { rejectUnauthorized: false };
}

module.exports = options;

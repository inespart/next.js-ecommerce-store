const products = [
  {
    product_name: 'Happy birthday 30',
    src: '/happy_30_transparent.png',
    product_description: 'unique, handmade',
    price: '590',
  },
  {
    product_name: 'Merry Christmas',
    src: '/merry_christmas_transparent.png',
    product_description: 'unique, handmade',
    price: '590',
  },
  {
    product_name: 'Well done',
    src: '/coming-soon.jpg',
    product_description: 'unique, handmade',
    price: '390',
  },
  {
    product_name: 'Congratulations',
    src: '/congratulations_transparent.png',
    product_description: 'unique, handmade',
    price: '490',
  },
];

exports.up = async function up(sql) {
  await sql`
	INSERT INTO products ${sql(
    products,
    'product_name',
    'src',
    'product_description',
    'price',
  )}
	`;
};

exports.down = async function down(sql) {
  for (const product of products) {
    await sql`
			DELETE FROM
				products
			WHERE
				product_name = ${product.product_name} AND
				src = ${product.src} AND
				product_description = ${product.product_description} AND
				price = ${product.price}
		`;
  }
};

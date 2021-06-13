import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Layout from '../components/Layout';
import { lightGrey, normalText, smallText } from '../util/sharedStyles';

const checkoutPageContainer = css`
  display: flex;
  margin-bottom: 32px;
`;

const formContainer = css`
  display: flex;
  flex-direction: column;
  padding: 0 128px;
  width: 65%;

  h2 {
    margin-left: 0;
    margin-top: 64px;
  }

  label {
    display: block;
  }

  input,
  select {
    padding: 16px 32px;
    margin: 8px 0;
    border: 1px solid ${lightGrey};
    border-radius: 8px;
    width: 100%;
  }

  button {
    margin: 32px 0;
  }
`;

const feedbackStyle = css`
  font-size: ${smallText};
  color: red;
`;

const totalSumContainer = css`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 25%;
  height: 90%;
  padding: 24px;
  margin-top: 64px;
  margin-bottom: 24px;
  background-color: ${lightGrey};
  border: 1px solid ${lightGrey};
  border-radius: 8px;
`;

const totalInCartStyle = css`
  font-size: ${normalText};
  /* display: flex;
  align-items: center; */

  img {
    width: 50px;
  }
`;

const inputContainer = css`
  display: flex;
`;

const input = css`
  width: 100%;
`;

const floatContainer = css`
  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .clear {
    clear: both;
  }
`;

export default function Checkout(props) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [finalShoppingCartArray, setFinalShoppingCartArray] = useState(
    props.finalShoppingCartArray,
  );

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const findFormErrors = () => {
    const {
      firstname,
      lastname,
      mail,
      address,
      country,
      zip,
      city,
      creditcardholder,
      creditcardnumber,
      creditcardexpirydate,
      creditcardcvv,
    } = form;
    const newErrors = {};
    // first and last name errors
    if (!firstname || firstname === '') {
      newErrors.firstname = 'Please enter your first name!';
    } else if (firstname.length > 40) {
      newErrors.firstname = 'First name is too long!';
    }
    if (!lastname || lastname === '') {
      newErrors.lastname = 'Please enter your last name!';
    } else if (lastname.length > 40) {
      newErrors.lastname = 'Last name is too long!';
    }
    // mail errors
    if (!mail || mail === '') {
      newErrors.mail = 'Please enter an e-mail address!';
    } else if (!mail.includes('@')) {
      newErrors.mail = 'Please enter a valid e-mail address!';
    }
    // address errors
    if (!address || address === '') {
      newErrors.address = 'Please enter your address!';
    } else if (address.length > 100) {
      newErrors.address = 'The address is too long!';
    }
    // zip code errors
    if (!zip || zip.length > 5 || zip.length < 4) {
      newErrors.zip = 'Please enter a valid ZIP Code!';
    }
    // city errors
    if (!city || city === '') {
      newErrors.city = 'Please enter a city!';
    }
    // country errors
    if (!country || country === '') {
      newErrors.country = 'Please select a country!';
    }
    // credit card holder errors
    if (!creditcardholder || creditcardholder.length > 40) {
      newErrors.creditcardholder = 'Please enter a credit card holder!';
    }
    // credit card number errors
    if (!creditcardnumber || creditcardnumber.length !== 16) {
      newErrors.creditcardnumber = 'Please enter a valid credit card number!';
    }
    // credit card expiry date errors
    if (
      !creditcardexpirydate ||
      creditcardexpirydate.length !== 5 ||
      !creditcardexpirydate.includes('/')
    ) {
      newErrors.creditcardexpirydate =
        'Please enter a expiry date in the format of MM/YY!';
    }
    // cvv errors
    if (!creditcardcvv || creditcardcvv.length !== 3) {
      newErrors.creditcardcvv = 'Please enter a valid CVV!';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      // alert('Thank you for your feedback!');
    }
  };

  // calculate the total sum of products inside shopping cart
  const totalSum = finalShoppingCartArray
    .reduce((acc, product) => {
      // need parseFloat to transform string into number
      return acc + parseFloat(product.price / 100) * product.quantity;
    }, 0)
    .toFixed(2);

  const quantity = props.shoppingCart
    .map((p) => p.quantity)
    .reduce((total, currentValue) => total + currentValue, 0);

  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>Checkout</title>
      </Head>
      <h1>Checkout</h1>
      <div css={checkoutPageContainer}>
        <div css={formContainer}>
          <h2>Contact Information</h2>
          <Form>
            <div css={inputContainer}>
              {/* First Name */}
              <Form.Group css={input}>
                <Form.Label
                  style={{ visibility: 'hidden' }}
                  htmlFor="firstname"
                >
                  First Name
                </Form.Label>
                <Form.Control
                  data-cy="first-name"
                  type="text"
                  id="firstname"
                  placeholder="First Name"
                  onChange={(e) => setField('firstname', e.target.value)}
                  isInvalid={!!errors.firstname}
                />
                <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                  {errors.firstname}
                </Form.Control.Feedback>
              </Form.Group>
              {/* Last Name */}
              <Form.Group css={input}>
                <Form.Label style={{ visibility: 'hidden' }} htmlFor="lastname">
                  Last name
                </Form.Label>
                <Form.Control
                  data-cy="last-name"
                  type="text"
                  id="lastname"
                  placeholder="Last Name"
                  onChange={(e) => setField('lastname', e.target.value)}
                  isInvalid={!!errors.lastname}
                />
                <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                  {errors.lastname}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            {/* E-Mail */}
            <Form.Group>
              <Form.Label style={{ visibility: 'hidden' }} htmlFor="mail">
                Mail
              </Form.Label>
              <Form.Control
                data-cy="mail"
                type="mail"
                id="mail"
                placeholder="E-Mail address"
                onChange={(e) => setField('mail', e.target.value)}
                isInvalid={!!errors.mail}
              />
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.mail}
              </Form.Control.Feedback>
            </Form.Group>
            {/* Phone Number */}
            <Form.Group>
              <Form.Label
                style={{ visibility: 'hidden' }}
                htmlFor="phonenumber"
              >
                Phone Number
              </Form.Label>
              <Form.Control
                data-cy="phone-number"
                type="number"
                id="phonenumber"
                placeholder="Phone Number (optional)"
                onChange={(e) => setField('phone', e.target.value)}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <h2>Shipping Information</h2>
            {/* Address */}
            <Form.Group>
              <Form.Label style={{ visibility: 'hidden' }} htmlFor="address">
                Address
              </Form.Label>
              <Form.Control
                data-cy="address"
                type="text"
                id="address"
                placeholder="Address"
                onChange={(e) => setField('address', e.target.value)}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <div css={inputContainer}>
              {/* ZIP Code */}
              <Form.Group css={input}>
                <Form.Label style={{ visibility: 'hidden' }} htmlFor="zipcode">
                  Zip Code
                </Form.Label>
                <Form.Control
                  data-cy="zip-code"
                  type="number"
                  id="zipcode"
                  placeholder="ZIP Code"
                  onChange={(e) => setField('zip', e.target.value)}
                  isInvalid={!!errors.zip}
                />
                <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                  {errors.zip}
                </Form.Control.Feedback>
              </Form.Group>
              {/* City */}
              <Form.Group css={input}>
                <Form.Label style={{ visibility: 'hidden' }} htmlFor="city">
                  City
                </Form.Label>
                <Form.Control
                  data-cy="city"
                  type="text"
                  id="city"
                  placeholder="City"
                  onChange={(e) => setField('city', e.target.value)}
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            {/* Country */}
            <Form.Group>
              <Form.Label style={{ visibility: 'hidden' }} htmlFor="country">
                Country
              </Form.Label>
              <Form.Control
                data-cy="country"
                as="select"
                id="country"
                onChange={(e) => setField('country', e.target.value)}
                isInvalid={!!errors.country}
              >
                <option value="">Select a country:</option>
                <option value="austria">Austria</option>
                <option value="germany">Germany</option>
                <option value="switzerland">Switzerland</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>
            <h2>Payment Information</h2>
            {/* Credit Card Holder */}
            <Form.Group>
              <Form.Label
                style={{ visibility: 'hidden' }}
                htmlFor="creditcardholder"
              >
                Credit Card Holder
              </Form.Label>
              <Form.Control
                data-cy="credit-card-holder"
                type="text"
                id="creditcardholder"
                placeholder="Card Holder Name"
                onChange={(e) => setField('creditcardholder', e.target.value)}
                isInvalid={!!errors.creditcardholder}
              />
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.creditcardholder}
              </Form.Control.Feedback>
            </Form.Group>
            {/* Credit Card Information */}
            <Form.Group>
              <Form.Label
                style={{ visibility: 'hidden' }}
                htmlFor="creditcardnumber"
              >
                Credit Card Number
              </Form.Label>
              <Form.Control
                data-cy="credit-card-number"
                type="number"
                id="creditcardnumber"
                placeholder="Card Number"
                onChange={(e) => setField('creditcardnumber', e.target.value)}
                isInvalid={!!errors.creditcardnumber}
              />
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.creditcardnumber}
              </Form.Control.Feedback>
            </Form.Group>
            <div css={inputContainer}>
              {/* Expiry date */}
              <Form.Group css={input}>
                <Form.Label
                  style={{ visibility: 'hidden' }}
                  htmlFor="expirydate"
                >
                  Credit Card Number
                </Form.Label>
                <Form.Control
                  data-cy="credit-card-expiry-date"
                  type="text"
                  id="expirydate"
                  placeholder="MM/YY"
                  onChange={(e) =>
                    setField('creditcardexpirydate', e.target.value)
                  }
                  isInvalid={!!errors.creditcardexpirydate}
                />
                <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                  {errors.creditcardexpirydate}
                </Form.Control.Feedback>
              </Form.Group>
              {/* CVV */}
              <Form.Group css={input}>
                <Form.Label style={{ visibility: 'hidden' }} htmlFor="cvv">
                  CVV
                </Form.Label>
                <Form.Control
                  data-cy="credit-card-cvv"
                  type="text"
                  id="cvv"
                  placeholder="CVV"
                  onChange={(e) => setField('creditcardcvv', e.target.value)}
                  isInvalid={!!errors.creditcardcvv}
                />
                <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                  {errors.creditcardcvv}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            {/* Submit Button */}
            {/* <input
              type="submit"
              value="Submit"
              className="button-default"
              onClick={(e) => handleSubmit(e)}
            /> */}

            <button
              value="Submit"
              className="button-default"
              onClick={(e) => handleSubmit(e)}
            >
              Pay {totalSum} €
            </button>
          </Form>
        </div>
        <div css={totalSumContainer}>
          <h3>
            {quantity} {quantity > 1 ? 'items' : 'item'} in cart:
          </h3>
          <br />
          {finalShoppingCartArray.map((p) => {
            return (
              <div css={totalInCartStyle} key={`product-${p.id}`}>
                {/* <img src={p.src} alt={p.productName} /> */}

                <div css={floatContainer}>
                  <p className="left">
                    {p.quantity}x {p.productName}
                  </p>
                  <p className="right">
                    {((p.price / 100) * p.quantity).toFixed(2)} €
                  </p>
                  <div className="clear"> </div>
                </div>
              </div>
            );
          })}
          <br />
          <br />
          <div css={floatContainer}>
            <h3 className="left">Total Sum:</h3>
            <h3 className="right">{totalSum} €</h3>
            <div className="clear"> </div>
          </div>

          <br />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getProducts } = await import('../util/database');
  const products = await getProducts();

  const rawCookie = context.req.cookies.shoppingCart;
  const cookieArray = rawCookie ? JSON.parse(rawCookie) : [];

  const finalShoppingCartArray = cookieArray.map((p) => {
    const draftShoppingCartObject = products.find((prod) => prod.id === p.id);
    return {
      id: draftShoppingCartObject.id,
      productName: draftShoppingCartObject.productName,
      src: draftShoppingCartObject.src,
      price: draftShoppingCartObject.price,
      quantity: p.quantity,
    };
  });

  console.log('finalShoppingCartArray', finalShoppingCartArray);

  return {
    props: {
      products,
      finalShoppingCartArray,
    },
  };
}

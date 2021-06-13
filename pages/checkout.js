import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Layout from '../components/Layout';
import { lightGrey, smallText } from '../util/sharedStyles';

const checkoutPageContainer = css`
  display: flex;
  margin-bottom: 32px;
`;

const formContainer = css`
  display: flex;
  flex-direction: column;
  padding: 0 128px;
  width: 70%;

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
    width: 90%;
  }
`;

const feedbackStyle = css`
  font-size: ${smallText};
  color: red;
`;

const totalSumContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 90%;
  padding: 24px;
  margin-top: 64px;
  margin-bottom: 24px;
  background-color: ${lightGrey};
  border: 1px solid ${lightGrey};
  border-radius: 8px;

  button {
    justify-content: center;
    align-items: center;
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
      creditcard,
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
    // credit card errors
    if (!creditcard || creditcard.length !== 16) {
      newErrors.creditcard = 'Please enter a valid credit card number!';
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
            {/* First Name */}
            <Form.Group>
              <Form.Label style={{ visibility: 'hidden' }} htmlFor="firstname">
                First Name
              </Form.Label>
              <Form.Control
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
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Last Name"
                onChange={(e) => setField('lastname', e.target.value)}
                isInvalid={!!errors.lastname}
              />
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.lastname}
              </Form.Control.Feedback>
            </Form.Group>
            {/* E-Mail */}
            <Form.Group>
              <Form.Control
                type="mail"
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
              <Form.Control
                type="number"
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
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={(e) => setField('address', e.target.value)}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            {/* ZIP Code */}
            <Form.Group>
              <Form.Control
                type="number"
                placeholder="ZIP Code"
                onChange={(e) => setField('zip', e.target.value)}
                isInvalid={!!errors.zip}
              />
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.zip}
              </Form.Control.Feedback>
            </Form.Group>
            {/* City */}
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="City"
                onChange={(e) => setField('city', e.target.value)}
                isInvalid={!!errors.city}
              />
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
            {/* Country */}
            <Form.Group>
              <Form.Control
                as="select"
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
            {/* Credit Card Information */}
            <Form.Group>
              <Form.Control
                type="number"
                placeholder="Credit Card Number"
                onChange={(e) => setField('creditcard', e.target.value)}
                isInvalid={!!errors.creditcard}
              />
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.creditcard}
              </Form.Control.Feedback>
            </Form.Group>
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
              Submit
            </button>
          </Form>
        </div>
        <div css={totalSumContainer}>
          <h3>
            Total Sum ({quantity} {quantity > 1 ? 'items' : 'item'}):
            <br />
            <br /> {totalSum} €
          </h3>
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

import { RiDeleteBin6Line } from 'react-icons/ri';
import {
  addItemByProductId,
  removeItemByProductId,
  subtractItemByProductId,
} from '../util/cookies';

export default function QuantityButtons(props) {
  return (
    <>
      <button
        className="button-small"
        onClick={() => {
          props.setShoppingCart(addItemByProductId(props.productId));
        }}
      >
        +
      </button>
      {props.quantity}{' '}
      <button
        className="button-small"
        onClick={() => {
          props.setShoppingCart(subtractItemByProductId(props.productId));
        }}
      >
        -
      </button>
      <button
        className="button-small-noborder"
        onClick={() => {
          props.setShoppingCart(removeItemByProductId(props.productId));
        }}
      >
        <RiDeleteBin6Line />
      </button>
    </>
  );
}

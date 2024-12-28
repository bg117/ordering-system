import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";

type CartItemProps = {
  name: string;
  quantity: number;
  price: number;
  onChangeQuantity: (quantity: number) => void;
  onDelete: () => void;
};

const CartItem: React.FC<CartItemProps> = ({
  name,
  quantity,
  price,
  onChangeQuantity,
  onDelete,
}) => {
  return (
    <div className="d-flex justify-content-between mb-2">
      <div>
        <input
          type="number"
          defaultValue={quantity}
          style={{
            width: "40px",
          }}
          className="me-2"
          onBlur={(e) => onChangeQuantity(Number.parseInt(e.target.value))}
        ></input>
        <span>{name}</span>
      </div>
      <div>
        <span>₱{(price * quantity).toFixed(2)}</span>
        <Button
          variant="outline-danger"
          onClick={onDelete}
          className="ms-2 border-0"
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;

import React from "react";

type CartItemProps = {
  name: string;
  quantity: number;
  price: number;
  onChangeQuantity: (quantity: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  name,
  quantity,
  price,
  onChangeQuantity,
}) => {
  return (
    <div className="d-flex justify-content-between mb-2">
      <div>
        <input
          type="number"
          defaultValue={quantity}
          style={{
            width: "50px",
          }}
          onBlur={(e) => onChangeQuantity(Number.parseInt(e.target.value))}
        ></input>
        {name}
      </div>
      <div>₱{(price * quantity).toFixed(2)}</div>
    </div>
  );
};

export default CartItem;

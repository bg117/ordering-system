import React from "react";

type CartItemProps = {
  name: string;
  quantity: number;
  price: number;
};

const CartItem: React.FC<CartItemProps> = ({ name, quantity, price }) => {
  return (
    <div className="d-flex justify-content-between mb-2">
      <div>{name} x {quantity}</div>
      <div>₱{(price * quantity).toFixed(2)}</div>
    </div>
  );
};

export default CartItem;

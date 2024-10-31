import type { CollectionConfig } from "payload";

export const CartItems: CollectionConfig = {
  slug: "cart-items",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "cart",
      type: "relationship",
      relationTo: "carts",
      required: true,
    },
    {
      name: "item",
      type: "relationship",
      relationTo: "items",
      required: true,
      unique: true, // Only one of each item in a cart (quantity is separate)
    },
    {
      name: "quantity",
      type: "number",
      required: true,
      defaultValue: 1,
      min: 1,
    },
    {
      name: "placed", // Determines if the item has been ordered
      type: "checkbox",
      defaultValue: false,
    },
  ],
};

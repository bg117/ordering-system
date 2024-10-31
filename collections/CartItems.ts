import type { Access, CollectionConfig } from "payload";

const isSameUserOrAdmin: Access = ({ req: { user } }) => {
  // if user is not logged in, deny access
  if (!user) return false;
  // if admin, allow access
  if (user?.collection === "admins") return true;

  // find the cart that belongs to the user
  return {
    createdBy: {
      equals: user.id,
    },
  };
};

export const CartItems: CollectionConfig = {
  slug: "cart-items",
  access: {
    // users can only see their own cart items
    create: ({ req: { user } }) => !!user,
    read: isSameUserOrAdmin,
    update: isSameUserOrAdmin,
    delete: isSameUserOrAdmin,
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

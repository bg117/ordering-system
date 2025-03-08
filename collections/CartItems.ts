import type { Access, CollectionConfig } from "payload";

const isSameUserOrAdmin: Access = async ({ req: { user } }) => {
  // if user is not logged in, deny access
  if (!user) return false;
  // if admin, allow access
  if (user?.collection === "admins") return true;

  // find the cart that belongs to the user
  return {
    user: {
      equals: user.id,
    },
  };
};

export const CartItems: CollectionConfig = {
  slug: "cart-items",
  access: {
    // users can only see their own cart items
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "item",
      type: "relationship",
      relationTo: "items",
      required: true,
    },
    {
      name: "quantity",
      type: "number",
      required: true,
      defaultValue: 1,
      min: 1,
    },
  ],
};

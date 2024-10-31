import { CartItem } from "@/payload-types";
import type {
  Access,
  CollectionBeforeChangeHook,
  CollectionConfig,
} from "payload";

const isSameUserOrAdmin: Access = async ({ req: { user } }) => {
  // if user is not logged in, deny access
  if (!user) return false;
  // if admin, allow access
  if (user?.collection === "admins") return true;

  // find the cart that belongs to the user
  return {
    user: {
      equals: user,
    },
  };
};

const beforeChangeHook: CollectionBeforeChangeHook<CartItem> = async ({
  operation,
  req: { user },
  originalDoc,
}) => {
  // if the user is not logged in, deny access
  if (!user || user?.collection !== "users") return;
  if (operation === "create" && originalDoc) {
    // if the operation is create, set the user to the current user
    originalDoc.user = user;
  }

  return originalDoc;
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
      unique: true, // Only one of each item in a cart (quantity is separate)
    },
    {
      name: "quantity",
      type: "number",
      required: true,
      defaultValue: 1,
      min: 1,
    },
  ],
  hooks: {
    beforeChange: [beforeChangeHook],
  },
};

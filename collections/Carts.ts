import type { Access, CollectionConfig } from "payload";

const isSameUserOrAdmin: Access = ({ req: { user } }) => {
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

export const Carts: CollectionConfig = {
  slug: "carts",
  access: {
    read: isSameUserOrAdmin,
    update: isSameUserOrAdmin,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      unique: true,
    },
  ],
};

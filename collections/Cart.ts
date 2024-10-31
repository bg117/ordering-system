import type { CollectionConfig } from "payload";

export const Cart: CollectionConfig = {
  slug: "cart",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "items",
      type: "relationship",
      relationTo: "items",
      hasMany: true,
      required: true,
    }
  ],
};

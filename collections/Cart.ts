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
      unique: true,
    }
  ],
};

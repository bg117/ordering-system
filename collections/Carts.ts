import type { CollectionConfig } from "payload";

export const Carts: CollectionConfig = {
  slug: "carts",
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

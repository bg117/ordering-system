import type { CollectionConfig } from "payload";

export const Queue: CollectionConfig = {
  slug: "queue",
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
  ],
};

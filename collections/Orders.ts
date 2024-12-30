import type { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  access: {
    create: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "extraInstructions",
      type: "text",
    },
    {
      name: "placedAt",
      type: "date",
      required: true,
      defaultValue: () => new Date(),
    },
  ],
};

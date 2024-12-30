import { Item } from "@/payload-types";
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
      defaultValue: () => new Date(),
    },
    {
      name: "orderItems",
      type: "relationship",
      hasMany: true,
      relationTo: "order-items",
      required: true,
    },
    {
      name: "total",
      type: "number",
      virtual: true,
      required: true,
      defaultValue: 0,
      access: {
        update: () => false,
      },
      hooks: {
        afterRead: [
          async ({ data, req: { payload } }) => {
            const { docs } = await payload.find({
              collection: "order-items",
              where: {
                id: {
                  in: data?.orderItems,
                },
              },
            });

            const total = docs.reduce((acc, { total }) => acc + total, 0);
            return total;
          },
        ],
      },
    },
  ],
};

import type { Access, CollectionConfig } from "payload";

const isSameUserOrAdmin: Access = async ({ req: { user } }) => {
  // if user is not logged in, deny access
  if (!user) return false;
  // if admin, allow access
  if (user?.collection === "admins") return true;

  return {
    user: {
      equals: user.id,
    },
  };
};

export const Orders: CollectionConfig = {
  slug: "orders",
  access: {
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

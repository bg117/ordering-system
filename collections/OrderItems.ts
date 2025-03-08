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

export const OrderItems: CollectionConfig = {
  slug: "order-items",
  access: {
    // users can only see their own cart items
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
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
            const {
              docs: [item],
            } = await payload.find({
              collection: "items",
              where: {
                id: {
                  equals: data?.item,
                },
              },
            });

            return item.price * data?.quantity;
          },
        ],
      },
    },
  ],
};

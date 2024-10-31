import { User } from "@/payload-types";
import type {
  CollectionAfterChangeHook,
  CollectionBeforeDeleteHook,
  CollectionConfig,
} from "payload";

const afterChangeHook: CollectionAfterChangeHook<User> = async ({
  doc,
  req,
  operation,
}) => {
  // if the operation is create, create a cart for the user
  if (operation === "create") {
    await req.payload.create({
      collection: "carts",
      data: {
        user: doc.id,
      },
      req,
    });
  }

  return doc;
};

const beforeDeleteHook: CollectionBeforeDeleteHook = async ({ req, id }) => {
  // delete the cart that belongs to the user
  await req.payload.delete({
    collection: "carts",
    where: {
      user: {
        equals: id,
      },
    },
  });
};

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "grade",
      type: "number",
      required: true,
    },
    {
      name: "section",
      type: "text",
      required: true,
    },
  ],
  hooks: {
    afterChange: [afterChangeHook],
    beforeDelete: [beforeDeleteHook],
  },
};

// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Admins } from "./collections/Admins";
import { Items } from "./collections/Items";
import { CartItems } from "./collections/CartItems";
import { Orders } from "./collections/Orders";
import { OrderItems } from "./collections/OrderItems";

import { cloudinaryStorage } from 'payload-cloudinary';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Admins, Users, Media, Items, CartItems, Orders, OrderItems],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    cloudinaryStorage({
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
        api_key: process.env.CLOUDINARY_API_KEY || "",
        api_secret: process.env.CLOUDINARY_API_SECRET || "",
      },
      collections: {
        'media': true, // Enable for media collection
        // Add more collections as needed
      },
      disableLocalStorage: true, // Optional, defaults to true
      enabled: true // Optional, defaults to true
    })
  ],
});

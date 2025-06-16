// import { PrismaClient, Prisma } from "../app/generated/prisma";

import { allProducts } from "@/lib/data";
import { PrismaClient } from "@prisma/client"; //install prisma client with npm install @prisma/client
// import { PrismaClient } from "@prisma/client"; // Ensure you have the Prisma Client installed

// npm i -d tsx // tsx is a TypeScript execution engine that allows you to run TypeScript files directly without compiling them first.
// npm i -D prisma // Install Prisma as a development dependency for running seed scripts
// npx prisma generate // Generate the Prisma Client after making changes to your schema
// npx prisma db seed --preview-feature // Run the seed script to populate your database with initial data
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: allProducts,
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

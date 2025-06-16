// In your actions file, e.g., /lib/actions.ts
import prisma from "./prisma"; // Make sure you have your prisma client instance
import { allProducts } from "@/app/page";
import { ProductSearchParams } from "./types";

export const getAllProducts = async () => {
  return await prisma.product.findMany({});
};

export const getProducts = async (searchParams: ProductSearchParams) => {
  const { category, color, size, price } = searchParams;

  let minPrice = null;
  let maxPrice = null;
  if (price) {
    // Handle price ranges like "51-100"
    const [min, max] = price.split("-");
    minPrice = parseInt(min, 10);
    maxPrice = max ? parseInt(max, 10) : null;
  }

  const products: allProducts = await prisma.product.findMany({
    where: {
      AND: [
        {
          category: { contains: category, mode: "insensitive" },
        },
        { color: { contains: color, mode: "insensitive" } },
        { size: { equals: size } },
        {
          price: {
            gte: minPrice || undefined, // Use undefined if minPrice is null
            lte: maxPrice || undefined, // Use undefined if maxPrice is null
          },
        },
      ],
    },
  });

  return products;
};

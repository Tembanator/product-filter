import { getAllProducts, getProducts } from "@/lib/actions";
import FilterControls from "./components/FilterControls";
import { ProductSearchParams } from "../lib/types";

export type allProducts = {
  id: string;
  name: string;
  category: string;
  color: string;
  size: string;
  price: number;
  imageUrl: string;
}[];
// @ts-expect-error typescript doesn't recognize the import path
async function Page({ searchParams }: { searchParams: ProductSearchParams }) {
  // const awaitedSearchParams = await searchParams;
  const allProducts: allProducts = await getProducts(searchParams);
  const originalProducts: allProducts = await getAllProducts();
  // const [currentUrl, setCurrentUrl] = useState("");

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Product Collection
          </h1>
          <p className="text-gray-600 mt-2">
            Use the filters to find your perfect item.
          </p>
        </header>

        {/* This block simulates the browser's URL bar */}
        {/* <div className="mb-6 bg-gray-100 p-3 rounded-lg border border-gray-200 text-center">
            <p className="text-sm text-gray-500 font-mono">Simulated URL:</p>
            <p className="text-sm text-gray-700 font-semibold truncate">{currentUrl}</p>
        </div> */}

        {/* Filter Controls */}
        <FilterControls originalProducts={originalProducts} />
        {/* Product Grid */}
        {allProducts.length > 0 ? (
          <div>
            <div className="mb-6 bg-gray-100 p-3 rounded-lg border border-gray-200 text-center">
              <p className="text-sm text-gray-500 font-mono">
                {allProducts.length} products
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {allProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden group transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="w-full h-56 bg-gray-200">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-lg truncate">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{product.category}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 border px-2 py-1 rounded-md">
                          {product.size}
                        </span>
                        <div
                          className="w-5 h-5 rounded-full border border-gray-200"
                          style={{
                            backgroundColor:
                              product.color.toLowerCase() === "white"
                                ? "#f0f0f0"
                                : product.color.toLowerCase(),
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-700">
              No Products Found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters or click Reset to see all products.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;

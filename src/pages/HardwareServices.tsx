import { hardwareProducts } from "@/data/hardwareProducts";
import { useCart } from "@/contexts/CartContext";

export default function HardwareServices() {
  const { addToCart } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Hardware Services</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hardwareProducts.map((product) => (
          <div
            key={product.name}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />

            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">{product.category}</p>

            <div className="mt-2">
              <span className="text-gray-400 line-through mr-2">
                ₹{product.originalPrice}
              </span>
              <span className="text-green-600 font-bold">
                ₹{product.salePrice}
              </span>
            </div>

            <button
              disabled={product.isOutOfStock}
              onClick={() => addToCart(product)}
              className={`mt-4 w-full py-2 rounded text-white ${
                product.isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {product.isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

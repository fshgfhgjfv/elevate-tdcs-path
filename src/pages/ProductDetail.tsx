import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { hardwareProducts } from "@/data/hardwareProducts";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const product = hardwareProducts.find((p) => p.id === id);
  const [selectedImg, setSelectedImg] = useState(0);
  const { addToCart } = useCart();

  if (!product) return <div>Product Not Found</div>;

  return (
    <div className="min-h-screen pt-28 pb-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden border bg-muted">
              <img
                src={product.images[selectedImg]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>

            <div className="flex gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`w-24 h-24 rounded-md border-2 overflow-hidden ${
                    selectedImg === i ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{product.name}</h1>

            <div className="flex gap-4 items-center">
              <span className="text-3xl font-bold text-red-500">
                ₹{product.salePrice}
              </span>
              <span className="line-through text-muted-foreground">
                ₹{product.originalPrice}
              </span>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>

              <Button size="lg" variant="secondary" className="flex-1">
                Buy Now
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 border-t pt-8 mt-8">
              <Trust icon={ShieldCheck} label="Secure Payment" />
              <Trust icon={Truck} label="Express Shipping" />
              <Trust icon={RefreshCcw} label="7-Day Return" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Trust = ({ icon: Icon, label }: any) => (
  <div className="flex flex-col items-center text-center p-2">
    <Icon className="text-primary mb-2" />
    <span className="text-xs">{label}</span>
  </div>
);

export default ProductDetail;

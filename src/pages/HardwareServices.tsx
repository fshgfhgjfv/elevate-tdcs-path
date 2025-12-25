import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { hardwareProducts } from "@/data/hardwareProducts";
import { useCart } from "@/contexts/CartContext";

export default function HardwareServices() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {hardwareProducts.map((product) => (
        <motion.div
          key={product.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded"
              />
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(product.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500" />
                ))}
              </div>

              <div className="mb-3">
                <span className="line-through text-gray-400 mr-2">
                  ₹{product.originalPrice}
                </span>
                <span className="font-bold text-lg">
                  ₹{product.salePrice}
                </span>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => addToCart(product)}>
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/product/${product.name}`)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

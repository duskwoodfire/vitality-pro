"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/cart-provider";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const products = [
  {
    id: "1",
    name: "Desk Calendar",
    price: 150.0,
    image: "/images/jan.png?height=200&width=300", // Update this path to match your image
    description:
      "Elegant desk calendar to keep your schedule organized all year.",
    category: "Supplements",
    inStock: true,
  },
  {
    id: "2",
    name: "Desk Calendar",
    price: 150,
    image: "/images/feb.png", // Update this path to match your image
    description:
      "Minimalist desk calendar with clear dates and a sleek design.",
    category: "Supplements",
    inStock: true,
  },
  {
    id: "3",
    name: "Journal",
    price: 350,
    image: "/images/Journal1.png", // Update this path to match your image
    description:
      "Premium journal with smooth pages, ideal for notes and ideas.",
    category: "Supplements",
    inStock: true,
  },
  {
    id: "4",
    name: "Journal",
    price: 350,
    image: "/images/Journal2.png", // Update this path to match your image
    description:
      "Durable hardcover journal, perfect for writing and sketching.",
    category: "Supplements",
    inStock: true,
  },
  {
    id: "5",
    name: "T-Shirt",
    price: 200,
    image: "/images/Shirt1.png", // Update this path to match your image
    description:
      "Comfortable and stylish cotton T-shirt, perfect for casual wear.",
    category: "Fitness",
    inStock: true,
  },
  {
    id: "6",
    name: "T-Shirt",
    price: 200,
    image: "/images/Shirt2.png", // Update this path to match your image
    description: "Premium quality T-shirt with a modern fit and soft fabric.",
    category: "Supplements",
    inStock: true,
  },
  {
    id: "7",
    name: "Poster",
    price: 50,
    image: "/images/Poster1.png", // Update this path to match your image
    description:
      "High-quality poster with vibrant colors, ideal for home decor.",
    category: "Supplements",
    inStock: true,
  },
  {
    id: "8",
    name: "Poster",
    price: 50,
    image: "/images/Poster2.png", // Update this path to match your image
    description:
      "Stylish wall poster to enhance your space with artistic flair.",
    category: "Supplements",
    inStock: true,
  },
];

export default function Shop() {
  const [filter, setFilter] = useState("All");
  const { addItem } = useCart();
  const { toast } = useToast();
  const [modalProduct, setModalProduct] = useState<(typeof products)[0] | null>(
    null
  );

  const categories = ["All", "Supplements", "Fitness"];
  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Product Image Modal */}
      <Dialog open={!!modalProduct} onOpenChange={() => setModalProduct(null)}>
        <DialogContent className="max-w-xl p-0 bg-transparent shadow-none">
          {modalProduct && (
            <div className="relative w-full h-[400px] md:h-[500px]">
              <Image
                src={modalProduct.image}
                alt={modalProduct.name}
                fill
                className="object-contain rounded-lg bg-white"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Health Products
            </h1>
            <p className="text-gray-600">
              Discover our premium selection of health and wellness products
            </p>
          </div>

          {/* Category Filter */}
          {/* <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  onClick={() => setFilter(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div> */}

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-white text-gray-900 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
                onClick={() => setModalProduct(product)}
              >
                <div className="w-full h-48 overflow-hidden relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <Badge
                        variant={product.inStock ? "default" : "secondary"}
                        className="mt-1"
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-primary font-medium">
                      Rs.{product.price}
                    </span>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      size="sm"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

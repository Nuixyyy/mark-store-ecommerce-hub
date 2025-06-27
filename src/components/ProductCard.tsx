
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  isAdmin?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onEdit, 
  onDelete, 
  isAdmin 
}) => {
  return (
    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-blue-400 font-bold text-xl">
            {product.price.toLocaleString()} د.ع
          </span>
          <span className="text-gray-400 text-sm bg-gray-700 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 space-y-2">
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          إضافة للسلة
        </Button>
        {isAdmin && (
          <div className="flex space-x-2 w-full">
            <Button
              onClick={() => onEdit?.(product)}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              تعديل
            </Button>
            <Button
              onClick={() => onDelete?.(product.id)}
              variant="destructive"
              className="flex-1"
            >
              حذف
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

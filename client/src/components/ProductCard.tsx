
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FrontendProduct } from '@/lib/typeAdapters';

interface ProductCardProps {
  product: FrontendProduct;
  onAddToCart: (product: FrontendProduct) => void;
  onEdit?: (product: FrontendProduct) => void;
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
    <Card className="bg-gradient-to-br from-purple-800/40 to-purple-900/60 border-purple-600/30 hover:from-purple-700/50 hover:to-purple-800/70 transition-all duration-300 overflow-hidden backdrop-blur-sm hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-purple-200 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-purple-300 font-bold text-xl">
            {product.price.toLocaleString()} د.ع
          </span>
          <span className="text-purple-300 text-sm bg-purple-800/50 px-3 py-1 rounded-full backdrop-blur">
            {product.category}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 space-y-2">
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white border-none shadow-lg hover:shadow-purple-500/30"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          إضافة للسلة
        </Button>
        {isAdmin && (
          <div className="flex space-x-2 w-full">
            <Button
              onClick={() => onEdit?.(product)}
              variant="outline"
              className="flex-1 border-purple-600 text-purple-300 hover:bg-purple-700/50 hover:text-white"
            >
              تعديل
            </Button>
            <Button
              onClick={() => onDelete?.(product.id)}
              variant="destructive"
              className="flex-1 bg-red-600 hover:bg-red-700"
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

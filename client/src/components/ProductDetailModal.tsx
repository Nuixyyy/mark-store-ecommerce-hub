import React from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FrontendProduct } from '@/lib/typeAdapters';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: FrontendProduct | null;
  onAddToCart: (product: FrontendProduct) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  product, 
  onAddToCart 
}) => {
  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border-purple-600/30 text-white rounded-2xl"
        style={{backgroundColor: '#1a012a'}}
      >
        <DialogHeader className="text-right">
          <DialogTitle className="text-2xl font-bold text-white mb-4">
            تفاصيل المنتج
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Product Image */}
          <div className="aspect-square w-full max-w-md mx-auto overflow-hidden rounded-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              {product.name}
            </h2>
            
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-purple-300">
                {product.price.toLocaleString()} د.ع
              </span>
              <span className="text-purple-300 bg-purple-800/50 px-4 py-2 rounded-full backdrop-blur">
                {product.category}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-purple-200">
                وصف المنتج:
              </h3>
              <p className="text-purple-100 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white border-none shadow-lg hover:shadow-purple-500/30 py-3 text-lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              إضافة للسلة
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
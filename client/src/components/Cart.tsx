
import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FrontendCartItem, FrontendUser } from '@/lib/typeAdapters';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: FrontendCartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  user: FrontendUser | null;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  user
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">سلة التسوق</DialogTitle>
        </DialogHeader>
        
        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">السلة فارغة</p>
          </div>
        ) : (
          <>
            <ScrollArea className="max-h-96">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{item.name}</h4>
                      <p className="text-blue-400 font-medium">
                        {item.price.toLocaleString()} د.ع
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-gray-300">العدد:</span>
                        <div className="flex items-center space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="h-6 w-6 p-0 border-gray-600 text-gray-300"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-white px-2">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="h-6 w-6 p-0 border-gray-600 text-gray-300"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <Separator className="bg-gray-600" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>المجموع:</span>
                <span className="text-blue-400">{total.toLocaleString()} د.ع</span>
              </div>
              
              <Button
                onClick={onCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                إتمام الشراء
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Cart;

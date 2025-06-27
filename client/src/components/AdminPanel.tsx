
import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { FrontendProduct, FrontendCategory } from '@/lib/typeAdapters';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  categories: FrontendCategory[];
  onAddProduct: (product: Omit<FrontendProduct, 'id'>) => void;
  onEditProduct: (product: FrontendProduct) => void;
  onAddCategory: (name: string) => void;
  editingProduct?: FrontendProduct | null;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  categories,
  onAddProduct,
  onEditProduct,
  onAddCategory,
  editingProduct
}) => {
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: ''
  });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    if (editingProduct) {
      setProductForm({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price.toString(),
        image: editingProduct.image,
        category: editingProduct.category
      });
    } else {
      setProductForm({
        name: '',
        description: '',
        price: '',
        image: '',
        category: ''
      });
    }
  }, [editingProduct]);

  const handleSubmitProduct = () => {
    if (!productForm.name || !productForm.description || !productForm.price || !productForm.image || !productForm.category) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive"
      });
      return;
    }

    const price = parseFloat(productForm.price);
    if (isNaN(price) || price <= 0) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال سعر صحيح",
        variant: "destructive"
      });
      return;
    }

    if (editingProduct) {
      onEditProduct({
        ...editingProduct,
        name: productForm.name,
        description: productForm.description,
        price,
        image: productForm.image,
        category: productForm.category
      });
      toast({
        title: "تم بنجاح",
        description: "تم تعديل المنتج بنجاح"
      });
    } else {
      onAddProduct({
        name: productForm.name,
        description: productForm.description,
        price,
        image: productForm.image,
        category: productForm.category
      });
      toast({
        title: "تم بنجاح",
        description: "تم إضافة المنتج بنجاح"
      });
    }

    setProductForm({ name: '', description: '', price: '', image: '', category: '' });
    onClose();
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم التصنيف",
        variant: "destructive"
      });
      return;
    }

    onAddCategory(newCategoryName.trim());
    setNewCategoryName('');
    setShowCategoryDialog(false);
    
    toast({
      title: "تم بنجاح",
      description: "تم إضافة التصنيف بنجاح"
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="text-white max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-purple-600/30" style={{backgroundColor: '#1a012a'}}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="flex justify-between mb-4">
              <Button
                onClick={() => setShowCategoryDialog(true)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                إضافة تصنيف
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="productName">اسم المنتج</Label>
              <Input
                id="productName"
                value={productForm.name}
                onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productDescription">وصف المنتج</Label>
              <Textarea
                id="productDescription"
                value={productForm.description}
                onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productPrice">السعر (د.ع)</Label>
              <Input
                id="productPrice"
                type="number"
                value={productForm.price}
                onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productImage">رابط الصورة</Label>
              <Input
                id="productImage"
                type="url"
                value={productForm.image}
                onChange={(e) => setProductForm(prev => ({ ...prev, image: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label>التصنيف</Label>
              <Select value={productForm.category} onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name} className="text-white hover:bg-gray-600">
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSubmitProduct}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {editingProduct ? 'تحديث المنتج' : 'إضافة المنتج'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className="text-white max-w-md rounded-3xl border-purple-600/30" style={{backgroundColor: '#1a012a'}}>
          <DialogHeader>
            <DialogTitle className="text-center">إضافة تصنيف جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">اسم التصنيف</Label>
              <Input
                id="categoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button
              onClick={handleAddCategory}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              إضافة التصنيف
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminPanel;

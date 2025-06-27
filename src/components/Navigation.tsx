
import React, { useState } from 'react';
import { Home, ChevronDown, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { Category, User } from '@/types';

interface NavigationProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  onReviewsClick: () => void;
  onAddCategory: (name: string) => void;
  user: User | null;
}

const Navigation: React.FC<NavigationProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onReviewsClick,
  onAddCategory,
  user
}) => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم التصنيف",
        variant: "destructive"
      });
      return;
    }

    onAddCategory(categoryName.trim());
    setCategoryName('');
    setShowAddCategory(false);
    
    toast({
      title: "تم بنجاح",
      description: "تم إضافة التصنيف بنجاح"
    });
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/95 to-purple-800/95 backdrop-blur border-t border-purple-600/50 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 py-4">
            <Button
              variant={selectedCategory === null ? "default" : "ghost"}
              onClick={() => onCategorySelect(null)}
              className={`flex items-center space-x-2 rounded-full px-6 ${
                selectedCategory === null 
                  ? "bg-purple-600 text-white shadow-lg" 
                  : "text-purple-200 hover:text-white hover:bg-purple-700/50"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>الرئيسية</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-purple-200 hover:text-white hover:bg-purple-700/50 rounded-full px-6"
                >
                  <span>التصنيفات</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-purple-800 border-purple-600 min-w-[200px] backdrop-blur z-50 mb-2">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => onCategorySelect(category.name)}
                    className={`text-white hover:bg-purple-700 cursor-pointer ${
                      selectedCategory === category.name ? "bg-purple-600" : ""
                    }`}
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
                {user?.isAdmin && (
                  <>
                    <div className="border-t border-purple-600 my-1"></div>
                    <DropdownMenuItem
                      onClick={() => setShowAddCategory(true)}
                      className="text-white hover:bg-purple-700 cursor-pointer"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      إضافة تصنيف
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-6 w-px bg-purple-600/50"></div>

            <Button
              variant="ghost"
              onClick={onReviewsClick}
              className="flex items-center space-x-2 text-purple-200 hover:text-white hover:bg-purple-700/50 rounded-full px-6"
            >
              <Star className="h-4 w-4" />
              <span>تقييمات العملاء</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Add Category Dialog */}
      <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">إضافة تصنيف جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">اسم التصنيف</Label>
              <Input
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="ادخل اسم التصنيف"
              />
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={() => setShowAddCategory(false)}
                variant="ghost"
                className="flex-1"
              >
                إلغاء
              </Button>
              <Button
                onClick={handleAddCategory}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                إضافة
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navigation;

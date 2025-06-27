
import React, { useState } from 'react';
import { Home, ChevronDown, Star, Plus, Grid3X3, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { FrontendCategory, FrontendUser } from '@/lib/typeAdapters';

interface NavigationProps {
  categories: FrontendCategory[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  onReviewsClick: () => void;
  onAddCategory: (name: string) => void;
  onDeleteCategory?: (categoryId: string) => void;
  user: FrontendUser | null;
}

const Navigation: React.FC<NavigationProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onReviewsClick,
  onAddCategory,
  onDeleteCategory,
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
      <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/98 via-purple-800/95 to-purple-700/90 backdrop-blur-lg border-t border-purple-500/30 z-50 shadow-2xl rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Left side - Home and Categories */}
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex flex-col items-center space-y-1 text-purple-200 hover:text-white hover:bg-purple-600/40 rounded-3xl px-4 py-3 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-1">
                      <Grid3X3 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <ChevronDown className="h-3 w-3 rotate-0 transition-transform" />
                    </div>
                    <span className="text-xs font-medium">التصنيفات</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-purple-800/95 backdrop-blur-lg border-purple-500/30 min-w-[200px] z-50 mb-2 rounded-2xl shadow-2xl">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      className={`text-white hover:bg-purple-600/50 cursor-pointer rounded-xl m-1 transition-all duration-200 ${
                        selectedCategory === category.name ? "bg-purple-600/70" : ""
                      } ${user?.isAdmin ? 'flex justify-between items-center' : ''}`}
                      asChild
                    >
                      <div>
                        <span 
                          onClick={() => onCategorySelect(category.name)}
                          className="flex-1"
                        >
                          {category.name}
                        </span>
                        {user?.isAdmin && onDeleteCategory && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`هل أنت متأكد من حذف تصنيف "${category.name}"؟`)) {
                                onDeleteCategory(category.id);
                              }
                            }}
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-red-600/50 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                  {user?.isAdmin && (
                    <>
                      <div className="border-t border-purple-500/30 my-2 mx-2"></div>
                      <DropdownMenuItem
                        onClick={() => setShowAddCategory(true)}
                        className="text-white hover:bg-purple-600/50 cursor-pointer rounded-xl m-1 transition-all duration-200"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        إضافة تصنيف
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant={selectedCategory === null ? "default" : "ghost"}
                onClick={() => onCategorySelect(null)}
                className={`flex flex-col items-center space-y-1 rounded-3xl px-6 py-3 transition-all duration-300 group ${
                  selectedCategory === null 
                    ? "bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 scale-105" 
                    : "text-purple-200 hover:text-white hover:bg-purple-600/40"
                }`}
              >
                <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">الرئيسية</span>
              </Button>
            </div>

            {/* Separator Line */}
            <div className="w-px bg-purple-400/50 h-12"></div>

            {/* Right side - Customer Reviews */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={onReviewsClick}
                className="flex flex-col items-center space-y-1 text-purple-200 hover:text-white hover:bg-purple-600/40 rounded-3xl px-4 py-3 transition-all duration-300 group"
              >
                <Star className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">تقييمات العملاء</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Add Category Dialog */}
      <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
        <DialogContent className="text-white max-w-md rounded-3xl border-purple-600/30" style={{backgroundColor: '#1a012a'}}>
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
                className="bg-purple-800/30 border-purple-600/50 text-white rounded-xl"
                placeholder="ادخل اسم التصنيف"
              />
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={() => setShowAddCategory(false)}
                variant="ghost"
                className="flex-1 rounded-xl"
              >
                إلغاء
              </Button>
              <Button
                onClick={handleAddCategory}
                className="flex-1 bg-purple-600 hover:bg-purple-700 rounded-xl"
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


import React, { useState } from 'react';
import { Home, ChevronDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Category } from '@/types';

interface NavigationProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  onReviewsClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onReviewsClick
}) => {
  return (
    <nav className="bg-gradient-to-r from-purple-900/80 to-purple-800/80 backdrop-blur mb-8 rounded-2xl mx-4">
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

          <div className="h-6 w-px bg-purple-600/50"></div>

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
            <DropdownMenuContent className="bg-purple-800 border-purple-600 min-w-[200px] backdrop-blur z-50">
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
  );
};

export default Navigation;

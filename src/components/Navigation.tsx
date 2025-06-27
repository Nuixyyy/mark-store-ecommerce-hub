
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
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center space-x-8 py-4">
          <Button
            variant={selectedCategory === null ? "default" : "ghost"}
            onClick={() => onCategorySelect(null)}
            className={`flex items-center space-x-2 ${
              selectedCategory === null 
                ? "bg-blue-600 text-white" 
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            <Home className="h-4 w-4" />
            <span>الرئيسية</span>
          </Button>

          <div className="h-6 w-px bg-gray-600"></div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <span>التصنيفات</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-700 border-gray-600 min-w-[200px]">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => onCategorySelect(category.name)}
                  className={`text-white hover:bg-gray-600 cursor-pointer ${
                    selectedCategory === category.name ? "bg-blue-600" : ""
                  }`}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-6 w-px bg-gray-600"></div>

          <Button
            variant="ghost"
            onClick={onReviewsClick}
            className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700"
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

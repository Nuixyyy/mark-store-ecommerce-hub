
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="w-full max-w-2xl mx-auto relative mb-8">
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          {searchTerm ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange('')}
              className="h-8 w-8 p-0 text-purple-300 hover:text-white hover:bg-purple-700/50 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          ) : (
            <Search className="text-purple-300 h-5 w-5" />
          )}
        </div>
        <Input
          type="text"
          placeholder="ابحث عن المنتجات..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-purple-800/30 border-purple-600/50 text-white pl-12 pr-4 py-4 text-lg rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-purple-300 backdrop-blur"
        />
      </div>
    </div>
  );
};

export default SearchBar;

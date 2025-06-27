
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import AdminPanel from '@/components/AdminPanel';
import Navigation from '@/components/Navigation';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';
import type { Product, CartItem, User, Review, Category } from '@/types';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'إلكترونيات' },
    { id: '2', name: 'ملابس' },
    { id: '3', name: 'منزل وحديقة' }
  ]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedProducts = localStorage.getItem('products');
    const savedCategories = localStorage.getItem('categories');
    const savedReviews = localStorage.getItem('reviews');
    const savedCartItems = localStorage.getItem('cartItems');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
    if (savedReviews) setReviews(JSON.parse(savedReviews));
    if (savedCartItems) setCartItems(JSON.parse(savedCartItems));
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
  };

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleAddCategory = (name: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const handleAddToCart = (product: Product) => {
    if (!user) {
      toast({
        title: "يرجى تسجيل الدخول أولاً",
        description: "يجب تسجيل الدخول لإضافة المنتجات إلى السلة",
        variant: "destructive"
      });
      return;
    }

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    toast({
      title: "تم إضافة المنتج",
      description: `تم إضافة ${product.name} إلى السلة`
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast({
      title: "تم حذف المنتج",
      description: "تم حذف المنتج من السلة"
    });
  };

  const handleCheckout = () => {
    toast({
      title: "تم إتمام الشراء",
      description: "شكراً لك! سيتم التواصل معك قريباً",
    });
    setCartItems([]);
    setShowCart(false);
  };

  const handleAddReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('ar')
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      <Header
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        cartItemsCount={cartItemsCount}
        onCartClick={() => setShowCart(true)}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        <Navigation
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          onReviewsClick={() => setShowReviews(true)}
        />

        {user?.isAdmin && (
          <div className="mb-8 text-center">
            <Button
              onClick={() => {
                setEditingProduct(null);
                setShowAdminPanel(true);
              }}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-green-500/30 border-none"
            >
              <Plus className="h-4 w-4 mr-2" />
              إضافة منتج جديد
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-purple-300 text-lg">
                {searchTerm || selectedCategory ? 'لا توجد منتجات مطابقة لعملية البحث أو الفئة المحددة.' : 'لا توجد منتجات حالياً'}
              </p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onEdit={user?.isAdmin ? (product) => {
                  setEditingProduct(product);
                  setShowAdminPanel(true);
                } : undefined}
                onDelete={user?.isAdmin ? handleDeleteProduct : undefined}
                isAdmin={user?.isAdmin}
              />
            ))
          )}
        </div>
      </div>

      <Footer />

      {/* Dialogs */}
      <Cart
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => {
          setShowAdminPanel(false);
          setEditingProduct(null);
        }}
        categories={categories}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onAddCategory={handleAddCategory}
        editingProduct={editingProduct}
      />

      <Reviews
        isOpen={showReviews}
        onClose={() => setShowReviews(false)}
        reviews={reviews}
        onAddReview={handleAddReview}
      />
    </div>
  );
};

export default Index;

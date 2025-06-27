import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { 
  FrontendProduct, 
  FrontendCartItem, 
  FrontendUser, 
  FrontendCategory, 
  FrontendReview,
  convertProductFromBackend,
  convertUserFromBackend,
  convertReviewFromBackend,
  convertCategoryFromBackend,
  convertProductToBackend,
  convertCategoryToBackend,
  convertReviewToBackend
} from '@/lib/typeAdapters';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import OrderForm from '@/components/OrderForm';
import AdminPanel from '@/components/AdminPanel';
import Navigation from '@/components/Navigation';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';
import type { Product as BackendProduct, User as BackendUser, Review as BackendReview, Category as BackendCategory } from '@shared/schema';

const Index = () => {
  const [user, setUser] = useState<FrontendUser | null>(null);
  const [cartItems, setCartItems] = useState<FrontendCartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [editingProduct, setEditingProduct] = useState<FrontendProduct | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const { toast } = useToast();

  // Fetch data with React Query
  const { data: backendProducts = [], isLoading: productsLoading } = useQuery({
    queryKey: ['/api/products'],
  });

  const { data: backendCategories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['/api/categories'],
  });

  const { data: backendReviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ['/api/reviews'],
  });

  // Convert backend data to frontend format
  const products: FrontendProduct[] = (backendProducts as BackendProduct[]).map(p => 
    convertProductFromBackend(p, backendCategories as BackendCategory[])
  );

  const categories: FrontendCategory[] = (backendCategories as BackendCategory[]).map(convertCategoryFromBackend);

  const reviews: FrontendReview[] = (backendReviews as BackendReview[]).map(convertReviewFromBackend);

  // Load cart and user from localStorage (client-side only data)
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedCartItems = localStorage.getItem('cartItems');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCartItems) setCartItems(JSON.parse(savedCartItems));
  }, []);

  // Save cart and user to localStorage
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

  // Mutations for API calls
  const createProductMutation = useMutation({
    mutationFn: (productData: Omit<FrontendProduct, 'id'>) => 
      apiRequest('/api/products', {
        method: 'POST',
        body: JSON.stringify(convertProductToBackend(productData, backendCategories as BackendCategory[]))
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Product added successfully" });
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, ...productData }: FrontendProduct) => 
      apiRequest(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(convertProductToBackend(productData, backendCategories as BackendCategory[]))
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Product updated successfully" });
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) => 
      apiRequest(`/api/products/${productId}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Product deleted successfully" });
    }
  });

  const createCategoryMutation = useMutation({
    mutationFn: (categoryData: Omit<FrontendCategory, 'id'>) => 
      apiRequest('/api/categories', {
        method: 'POST',
        body: JSON.stringify(convertCategoryToBackend(categoryData))
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      toast({ title: "تم إضافة التصنيف بنجاح" });
    }
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (categoryId: string) => 
      apiRequest(`/api/categories/${categoryId}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      toast({ title: "تم حذف التصنيف بنجاح" });
    }
  });

  const createReviewMutation = useMutation({
    mutationFn: (reviewData: Omit<FrontendReview, 'id' | 'date'>) => 
      apiRequest('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(convertReviewToBackend(reviewData))
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      toast({ title: "Review added successfully" });
    }
  });

  const handleLogin = (newUser: FrontendUser) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
  };

  const handleAddProduct = (productData: Omit<FrontendProduct, 'id'>) => {
    createProductMutation.mutate(productData);
  };

  const handleEditProduct = (updatedProduct: FrontendProduct) => {
    updateProductMutation.mutate(updatedProduct);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProductMutation.mutate(productId);
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleAddCategory = (name: string) => {
    createCategoryMutation.mutate({ name });
  };

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategoryMutation.mutate(categoryId);
  };

  const handleAddToCart = (product: FrontendProduct) => {
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
    setShowCart(false);
    setShowOrderForm(true);
  };

  const handleOrderConfirm = () => {
    setCartItems([]);
    setShowOrderForm(false);
  };

  const handleAddReview = (reviewData: Omit<FrontendReview, 'id' | 'date'>) => {
    createReviewMutation.mutate(reviewData);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen text-white pb-20" style={{backgroundColor: '#1a012a'}}>
      <Header
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        cartItemsCount={cartItemsCount}
        onCartClick={() => setShowCart(true)}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

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

      <Navigation
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        onReviewsClick={() => setShowReviews(true)}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        user={user}
      />

      {/* Dialogs */}
      <Cart
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
        user={user}
      />

      <OrderForm
        isOpen={showOrderForm}
        onClose={() => setShowOrderForm(false)}
        items={cartItems}
        user={user}
        onOrderConfirm={handleOrderConfirm}
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
        user={user}
      />
    </div>
  );
};

export default Index;

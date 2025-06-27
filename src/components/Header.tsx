
import React, { useState } from 'react';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import type { User as UserType } from '@/types';

interface HeaderProps {
  user: UserType | null;
  onLogin: (user: UserType) => void;
  onLogout: () => void;
  cartItemsCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout, cartItemsCount, onCartClick }) => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+964 ');
  const { toast } = useToast();

  const handleLogin = () => {
    if (!fullName.trim() || phoneNumber.length < 15) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال الاسم الثلاثي ورقم هاتف صحيح",
        variant: "destructive"
      });
      return;
    }

    const isFirstUser = !localStorage.getItem('hasUsers');
    const newUser: UserType = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      phoneNumber,
      isAdmin: isFirstUser
    };

    if (isFirstUser) {
      localStorage.setItem('hasUsers', 'true');
    }

    onLogin(newUser);
    setShowLoginDialog(false);
    setFullName('');
    setPhoneNumber('+964 ');
    
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: isFirstUser ? "مرحباً بك كمدير الموقع" : "مرحباً بك في مارك ستور"
    });
  };

  const handlePhoneChange = (value: string) => {
    const prefix = '+964 ';
    if (!value.startsWith(prefix)) {
      setPhoneNumber(prefix);
      return;
    }
    
    const numbers = value.slice(prefix.length).replace(/\D/g, '');
    if (numbers.length <= 10) {
      setPhoneNumber(prefix + numbers);
    }
  };

  return (
    <>
      <header className="w-full bg-gray-900 border-b border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Login/User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
                  <User className="h-5 w-5 text-blue-400" />
                  <span className="text-white text-sm">{user.fullName}</span>
                  {user.isAdmin && (
                    <Badge variant="secondary" className="bg-blue-600 text-white">
                      مدير
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setShowLoginDialog(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                تسجيل الدخول
              </Button>
            )}
          </div>

          {/* Logo */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">مارك ستور</h1>
            <p className="text-gray-400 text-sm">Mark Store</p>
          </div>

          {/* Cart */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={onCartClick}
              className="text-gray-300 hover:text-white hover:bg-gray-800 p-2"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 rounded-full flex items-center justify-center text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">تسجيل الدخول</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">الاسم الثلاثي</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="الاسم الأول الأوسط الأخير"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">رقم الهاتف</Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="+964 7XX XXX XXXX"
                className="bg-gray-700 border-gray-600 text-white"
                dir="ltr"
              />
              <p className="text-xs text-gray-400">يجب أن يتكون من 11 رقم (بدون كود البلد)</p>
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              تسجيل الدخول
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;

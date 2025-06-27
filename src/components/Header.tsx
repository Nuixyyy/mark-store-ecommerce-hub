import React, { useState } from 'react';
import { ShoppingCart, User, LogOut, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { toast } = useToast();

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive"
      });
      return;
    }

    const newUser: UserType = {
      id: Date.now().toString(),
      fullName: 'اسم المستخدم',
      email: loginForm.email,
      password: loginForm.password,
      isAdmin: loginForm.email === 'admin@example.com'
    };
    onLogin(newUser);
    setLoginForm({ email: '', password: '' });
    setShowLogin(false);

    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: "مرحباً بك في المتجر",
    });
  };

  const handleRegister = () => {
    if (!registerForm.fullName.trim() || !registerForm.email.trim() || !registerForm.password.trim() || !registerForm.confirmPassword.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive"
      });
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive"
      });
      return;
    }

    const newUser: UserType = {
      id: Date.now().toString(),
      fullName: registerForm.fullName,
      email: registerForm.email,
      password: registerForm.password,
      isAdmin: false
    };
    onLogin(newUser);
    setRegisterForm({ fullName: '', email: '', password: '', confirmPassword: '' });
    setShowRegister(false);

    toast({
      title: "تم التسجيل بنجاح",
      description: "تم إنشاء حسابك بنجاح",
    });
  };

  return (
    <>
      <header className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white shadow-2xl border-b border-purple-600/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Cart */}
            <div className="flex items-center">
              <Button
                onClick={onCartClick}
                variant="ghost"
                className="relative bg-purple-700/50 hover:bg-purple-600/70 rounded-2xl px-4 py-2 transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Center - Logo/Title */}
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">
                متجر إلكتروني
              </h1>
              <p className="text-purple-300 text-sm">تسوق أفضل المنتجات</p>
            </div>

            {/* Right side - User actions */}
            <div className="flex items-center space-x-2">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">{user.fullName}</p>
                    {user.isAdmin && (
                      <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-1 rounded-full font-semibold">
                        مدير
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={onLogout}
                    variant="ghost"
                    size="sm"
                    className="bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-red-200 rounded-2xl transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setShowRegister(true)}
                    variant="ghost"
                    size="sm"
                    className="bg-green-600/20 hover:bg-green-600/40 text-green-300 hover:text-green-200 rounded-2xl transition-all duration-300"
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    تسجيل
                  </Button>
                  <Button
                    onClick={() => setShowLogin(true)}
                    variant="ghost"
                    size="sm"
                    className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 hover:text-blue-200 rounded-2xl transition-all duration-300"
                  >
                    <User className="h-4 w-4 mr-1" />
                    دخول
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Login Dialog */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center">تسجيل الدخول</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginFormChange}
                type="email"
                className="bg-gray-700 border-gray-600 text-white rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginFormChange}
                type="password"
                className="bg-gray-700 border-gray-600 text-white rounded-xl"
              />
            </div>
            <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">
              تسجيل الدخول
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Register Dialog */}
      <Dialog open={showRegister} onOpenChange={setShowRegister}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center">إنشاء حساب</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">الاسم الكامل</Label>
              <Input
                id="fullName"
                name="fullName"
                value={registerForm.fullName}
                onChange={handleRegisterFormChange}
                className="bg-gray-700 border-gray-600 text-white rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registerEmail">البريد الإلكتروني</Label>
              <Input
                id="registerEmail"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterFormChange}
                type="email"
                className="bg-gray-700 border-gray-600 text-white rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registerPassword">كلمة المرور</Label>
              <Input
                id="registerPassword"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterFormChange}
                type="password"
                className="bg-gray-700 border-gray-600 text-white rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                value={registerForm.confirmPassword}
                onChange={handleRegisterFormChange}
                type="password"
                className="bg-gray-700 border-gray-600 text-white rounded-xl"
              />
            </div>
            <Button onClick={handleRegister} className="w-full bg-green-600 hover:bg-green-700 rounded-xl">
              إنشاء حساب
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;

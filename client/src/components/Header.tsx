import React, { useState } from 'react';
import { ShoppingCart, User, LogOut, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { FrontendUser } from '@/lib/typeAdapters';

interface HeaderProps {
  user: FrontendUser | null;
  onLogin: (user: FrontendUser) => void;
  onLogout: () => void;
  cartItemsCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout, cartItemsCount, onCartClick }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({ phoneNumber: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    phoneNumber: '',
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
    if (!loginForm.phoneNumber.trim() || !loginForm.password.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive"
      });
      return;
    }

    const newUser: FrontendUser = {
      id: Date.now().toString(),
      fullName: 'اسم المستخدم',
      phoneNumber: loginForm.phoneNumber,
      isAdmin: loginForm.phoneNumber === '0501234567'
    };
    onLogin(newUser);
    setLoginForm({ phoneNumber: '', password: '' });
    setShowLogin(false);

    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: "مرحباً بك في المتجر",
    });
  };

  const handleRegister = () => {
    if (!registerForm.fullName.trim() || !registerForm.phoneNumber.trim() || !registerForm.password.trim() || !registerForm.confirmPassword.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive"
      });
      return;
    }

    // التحقق من أن الاسم يحتوي على ثلاثة أجزاء على الأقل
    const nameParts = registerForm.fullName.trim().split(' ').filter(part => part.length > 0);
    if (nameParts.length < 3) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال الاسم الثلاثي كاملاً",
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

    const newUser: FrontendUser = {
      id: Date.now().toString(),
      fullName: registerForm.fullName,
      phoneNumber: registerForm.phoneNumber,
      isAdmin: false
    };
    onLogin(newUser);
    setRegisterForm({ fullName: '', phoneNumber: '', password: '', confirmPassword: '' });
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
                size="sm"
                className="relative bg-white/10 hover:bg-white/20 text-white rounded-2xl px-4 py-2 transition-all duration-300 hover:scale-105"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">السلة</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Center - Brand */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                مارك ستور
              </h1>
            </div>

            {/* Right side - User menu */}
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-white">
                        {user.fullName}
                      </span>
                      {user.isAdmin && (
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                          مدير
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-purple-200">
                      {user.phoneNumber}
                    </div>
                  </div>
                  <Button
                    onClick={onLogout}
                    variant="ghost"
                    size="sm"
                    className="bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-red-200 rounded-2xl transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    خروج
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

      {/* Login/Register Combined Dialog */}
      <Dialog open={showLogin || showRegister} onOpenChange={(open) => {
        setShowLogin(false);
        setShowRegister(false);
      }}>
        <DialogContent className="bg-slate-800/95 backdrop-blur-lg border-slate-600/50 text-white max-w-md rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold mb-6">
              تسجيل الدخول / التسجيل
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-2">
            <div className="space-y-3">
              <Label htmlFor="fullName" className="text-white text-right block">
                الاسم الثلاثي
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={registerForm.fullName}
                onChange={handleRegisterFormChange}
                className="bg-slate-700/70 border-slate-600/50 text-white rounded-xl h-14 text-right px-4"
                placeholder=""
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="phoneNumber" className="text-white text-right block">
                رقم الهاتف (11 رقماً بعد +964)
              </Label>
              <div className="flex rounded-xl overflow-hidden bg-slate-700/70 border border-slate-600/50">
                <div className="bg-slate-600/70 px-4 py-4 text-white font-semibold border-l border-slate-500/50">
                  +964
                </div>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={registerForm.phoneNumber}
                  onChange={handleRegisterFormChange}
                  type="tel"
                  className="bg-transparent border-0 text-white rounded-none h-14 text-right px-4 flex-1"
                  placeholder="7701234567"
                />
              </div>
              <p className="text-slate-400 text-sm text-right">
                الرجاء إدخال 11 رقماً فقط
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-white text-right block">
                كلمة المرور
              </Label>
              <Input
                id="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterFormChange}
                type="password"
                className="bg-slate-700/70 border-slate-600/50 text-white rounded-xl h-14 text-right px-4"
                placeholder=""
              />
            </div>

            <Button 
              onClick={handleRegister} 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl h-14 text-lg font-semibold shadow-lg"
            >
              تأكيد التسجيل
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
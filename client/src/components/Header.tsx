import React, { useState } from 'react';
import { ShoppingCart, User, LogOut, UserPlus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loginForm, setLoginForm] = useState({ phoneNumber: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const { toast } = useToast();

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // للتحقق من رقم الهاتف - فقط أرقام وحد أقصى 11 رقم
    if (name === 'phoneNumber') {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 11) {
        setLoginForm({ ...loginForm, [name]: numbersOnly });
      }
      return;
    }
    
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleRegisterFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // للتحقق من رقم الهاتف - فقط أرقام وحد أقصى 11 رقم
    if (name === 'phoneNumber') {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 11) {
        setRegisterForm({ ...registerForm, [name]: numbersOnly });
      }
      return;
    }
    
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleLogin = () => {
    console.log("Login form data:", loginForm);
    console.log("Phone number:", loginForm.phoneNumber, "Length:", loginForm.phoneNumber.length);
    console.log("Password:", loginForm.password, "Length:", loginForm.password.length);
    
    if (!loginForm.phoneNumber.trim() || !loginForm.password.trim()) {
      console.log("Validation failed - empty fields");
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive"
      });
      return;
    }

    // التحقق من رقم الهاتف (11 رقم فقط)
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(loginForm.phoneNumber)) {
      toast({
        title: "خطأ",
        description: "رقم الهاتف يجب أن يكون 11 رقم بالضبط",
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
    console.log("Register form data:", registerForm);
    console.log("Full name:", registerForm.fullName, "Length:", registerForm.fullName.length);
    console.log("Phone number:", registerForm.phoneNumber, "Length:", registerForm.phoneNumber.length);
    console.log("Password:", registerForm.password, "Length:", registerForm.password.length);
    console.log("Confirm password:", registerForm.confirmPassword, "Length:", registerForm.confirmPassword.length);
    
    if (!registerForm.fullName.trim() || !registerForm.phoneNumber.trim() || !registerForm.password.trim() || !registerForm.confirmPassword.trim()) {
      console.log("Validation failed - empty fields");
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

    // التحقق من رقم الهاتف (11 رقم فقط)
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(registerForm.phoneNumber)) {
      toast({
        title: "خطأ",
        description: "رقم الهاتف يجب أن يكون 11 رقم بالضبط",
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

    // التحقق من كلمة مرور المدير
    const isAdmin = registerForm.password === '574667%&%^*^56984809548678%*%^8';
    
    const newUser: FrontendUser = {
      id: Date.now().toString(),
      fullName: registerForm.fullName,
      phoneNumber: registerForm.phoneNumber,
      isAdmin: isAdmin
    };
    onLogin(newUser);
    setRegisterForm({ fullName: '', phoneNumber: '', password: '', confirmPassword: '' });
    setShowRegister(false);

    toast({
      title: "تم التسجيل بنجاح",
      description: isAdmin ? "مرحباً بك كمدير للمتجر" : "مرحباً بك في مارك ستور",
    });
  };

  return (
    <>
      <header className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white shadow-2xl border-b border-purple-600/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Login/Register */}
            <div className="flex items-center">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="relative bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-300 hover:scale-105"
                    >
                      <User className="h-6 w-6" />
                      <ChevronDown className="h-3 w-3 absolute -bottom-1 -right-1 bg-purple-600 rounded-full p-0.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-purple-800/95 backdrop-blur-lg border-purple-500/30 min-w-[200px] rounded-2xl shadow-2xl mt-2" align="start">
                    <div className="p-4 space-y-3">
                      <div className="text-center">
                        <div className="text-white font-medium text-lg">
                          {user.fullName}
                        </div>
                        {user.isAdmin && (
                          <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs px-3 py-1 rounded-full font-medium shadow-lg inline-block mt-1">
                            مدير
                          </span>
                        )}
                        <div className="text-purple-200 text-sm mt-1">
                          {user.phoneNumber}
                        </div>
                      </div>
                      <div className="border-t border-purple-500/30 pt-3">
                        <Button
                          onClick={onLogout}
                          variant="ghost"
                          size="sm"
                          className="w-full bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-red-200 rounded-xl transition-all duration-300"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          تسجيل الخروج
                        </Button>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      setIsLoginMode(true);
                      setShowLogin(true);
                    }}
                    variant="ghost"
                    size="sm"
                    className="bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300"
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">دخول</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setIsLoginMode(false);
                      setShowLogin(true);
                    }}
                    variant="ghost"
                    size="sm"
                    className="bg-purple-600/30 hover:bg-purple-600/50 text-white rounded-2xl transition-all duration-300"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">تسجيل</span>
                  </Button>
                </div>
              )}
            </div>

            {/* Center - Brand */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                MARKSTOR
              </h1>
              <p className="text-xs text-purple-200 mt-1 hidden sm:block">
                متجر الكتروني لبيع الاكسسوارات الكيمنك
              </p>
              <p className="text-xs text-purple-300 hidden sm:block">
                توصيل جميع محافظات العراق 5 الف
              </p>
            </div>

            {/* Right side - Cart */}
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
          </div>
        </div>
      </header>

      {/* Login/Register Combined Dialog */}
      <Dialog open={showLogin || showRegister} onOpenChange={(open) => {
        setShowLogin(false);
        setShowRegister(false);
      }}>
        <DialogContent className="text-white max-w-md rounded-3xl shadow-2xl border-purple-600/30" style={{backgroundColor: '#1a012a'}}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold mb-6">
              تسجيل الدخول / التسجيل
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-2">
            {/* Toggle between Login/Register */}
            <div className="flex bg-purple-800/30 rounded-xl p-1">
              <button
                onClick={() => setIsLoginMode(true)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  isLoginMode 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                دخول
              </button>
              <button
                onClick={() => setIsLoginMode(false)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  !isLoginMode 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                تسجيل
              </button>
            </div>

            {isLoginMode ? (
              /* Login Form */
              <>
                <div className="space-y-3">
                  <Label htmlFor="loginPhone" className="text-white text-right block">
                    رقم الهاتف
                  </Label>
                  <div className="flex rounded-xl overflow-hidden bg-purple-800/30 border border-purple-600/50">
                    <div className="bg-purple-700/50 px-4 py-4 text-white font-semibold border-l border-purple-500/50">
                      +964
                    </div>
                    <Input
                      id="loginPhone"
                      name="phoneNumber"
                      value={loginForm.phoneNumber}
                      onChange={handleLoginFormChange}
                      type="tel"
                      className="bg-transparent border-0 text-white rounded-none h-14 text-right px-4 flex-1"
                      placeholder="1112233444"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="loginPassword" className="text-white text-right block">
                    كلمة المرور
                  </Label>
                  <Input
                    id="loginPassword"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginFormChange}
                    type="password"
                    className="bg-purple-800/30 border-purple-600/50 text-white rounded-xl h-14 text-right px-4"
                    placeholder=""
                  />
                </div>

                <Button 
                  onClick={handleLogin} 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl h-14 text-lg font-semibold shadow-lg"
                >
                  دخول
                </Button>
              </>
            ) : (
              /* Register Form */
              <>
                <div className="space-y-3">
                  <Label htmlFor="fullName" className="text-white text-right block">
                    الاسم الثلاثي
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={registerForm.fullName}
                    onChange={handleRegisterFormChange}
                    className="bg-purple-800/30 border-purple-600/50 text-white rounded-xl h-14 text-right px-4"
                    placeholder="محمد أحمد علي"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="phoneNumber" className="text-white text-right block">
                    رقم الهاتف (11 رقماً بعد +964)
                  </Label>
                  <div className="flex rounded-xl overflow-hidden bg-purple-800/30 border border-purple-600/50">
                    <div className="bg-purple-700/50 px-4 py-4 text-white font-semibold border-l border-purple-500/50">
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
                  <p className="text-purple-300 text-sm text-right">
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
                    className="bg-purple-800/30 border-purple-600/50 text-white rounded-xl h-14 text-right px-4"
                    placeholder=""
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-white text-right block">
                    تأكيد كلمة المرور
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterFormChange}
                    type="password"
                    className="bg-purple-800/30 border-purple-600/50 text-white rounded-xl h-14 text-right px-4"
                    placeholder=""
                  />
                </div>

                <Button 
                  onClick={handleRegister} 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl h-14 text-lg font-semibold shadow-lg"
                >
                  إنشاء حساب
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
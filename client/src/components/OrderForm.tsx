
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { FrontendCartItem, FrontendUser } from '@/lib/typeAdapters';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  items: FrontendCartItem[];
  user: FrontendUser | null;
  onOrderConfirm: () => void;
}

const iraqiProvinces = [
  'بغداد',
  'البصرة',
  'أربيل',
  'نينوى',
  'الأنبار',
  'الديوانية',
  'كربلاء',
  'كركوك',
  'بابل',
  'واسط',
  'صلاح الدين',
  'النجف',
  'ديالى',
  'المثنى',
  'ذي قار',
  'ميسان',
  'السليمانية',
  'دهوك'
];

const OrderForm: React.FC<OrderFormProps> = ({
  isOpen,
  onClose,
  items,
  user,
  onOrderConfirm
}) => {
  const [orderData, setOrderData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phoneNumber || '',
    province: '',
    city: '',
    notes: ''
  });
  const { toast } = useToast();

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 5000;
  const grandTotal = total + deliveryFee;

  const handleConfirmOrder = async () => {
    if (!user) {
      toast({
        title: "يرجى تسجيل الدخول أولاً",
        description: "يجب تسجيل الدخول لتأكيد الطلب",
        variant: "destructive"
      });
      return;
    }

    if (!orderData.fullName.trim() || !orderData.phone.trim() || !orderData.province || !orderData.city.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    try {
      // إعداد رسالة التليجرام
      const orderMessage = `
🛒 طلب جديد

👤 معلومات العميل:
الاسم: ${orderData.fullName}
الهاتف: ${orderData.phone}
المحافظة: ${orderData.province}
المدينة/القضاء: ${orderData.city}
${orderData.notes ? `الملاحظات: ${orderData.notes}` : ''}

📦 تفاصيل الطلب:
${items.map(item => `• ${item.name} - الكمية: ${item.quantity} - السعر: ${item.price.toLocaleString()} د.ع`).join('\n')}

💰 الإجمالي:
قيمة المنتجات: ${total.toLocaleString()} د.ع
التوصيل: ${deliveryFee.toLocaleString()} د.ع
المجموع الكلي: ${grandTotal.toLocaleString()} د.ع
      `;

      const botToken = '7570266115:AAGZUk96YHFewFpDlqkVpbDT6PwyZJ2ZVmE';
      const chatId = '7348531151';
      
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: orderMessage,
          parse_mode: 'HTML'
        }),
      });

      if (response.ok) {
        toast({
          title: "تم تأكيد الطلب",
          description: "تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً",
        });
        onOrderConfirm();
        onClose();
      } else {
        throw new Error('فشل في إرسال الطلب');
      }
    } catch (error) {
      console.error('خطأ في إرسال الطلب:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">تأكيد الطلب</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* معلومات العميل */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-300">معلومات العميل</h3>
            
            <div className="space-y-2">
              <Label htmlFor="fullName">الاسم الثلاثي *</Label>
              <Input
                id="fullName"
                value={orderData.fullName}
                onChange={(e) => setOrderData(prev => ({ ...prev, fullName: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="الاسم الثلاثي"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف *</Label>
              <Input
                id="phone"
                value={orderData.phone}
                onChange={(e) => setOrderData(prev => ({ ...prev, phone: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="رقم الهاتف"
              />
            </div>

            <div className="space-y-2">
              <Label>المحافظة *</Label>
              <Select value={orderData.province} onValueChange={(value) => setOrderData(prev => ({ ...prev, province: value }))}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="اختر المحافظة" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 text-white">
                  {iraqiProvinces.map((province) => (
                    <SelectItem key={province} value={province} className="text-white hover:bg-gray-600">
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">القضاء/الناحية/المدينة *</Label>
              <Input
                id="city"
                value={orderData.city}
                onChange={(e) => setOrderData(prev => ({ ...prev, city: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="القضاء/الناحية/المدينة"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظة الزبون (اختياري)</Label>
              <Textarea
                id="notes"
                value={orderData.notes}
                onChange={(e) => setOrderData(prev => ({ ...prev, notes: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="أي ملاحظات إضافية..."
                rows={3}
              />
            </div>
          </div>

          <Separator className="bg-gray-600" />

          {/* ملخص الطلب */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-300">ملخص الطلب</h3>
            
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-gray-300 text-sm">الكمية: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-blue-400 font-medium">
                    {(item.price * item.quantity).toLocaleString()} د.ع
                  </span>
                </div>
              ))}
            </div>

            <Separator className="bg-gray-600" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>قيمة المنتجات:</span>
                <span className="text-blue-400">{total.toLocaleString()} د.ع</span>
              </div>
              <div className="flex justify-between">
                <span>التوصيل لجميع محافظات العراق:</span>
                <span className="text-blue-400">{deliveryFee.toLocaleString()} د.ع</span>
              </div>
              <Separator className="bg-gray-600" />
              <div className="flex justify-between text-lg font-semibold">
                <span>المجموع الكلي:</span>
                <span className="text-green-400">{grandTotal.toLocaleString()} د.ع</span>
              </div>
            </div>
          </div>

          {/* أزرار العمل */}
          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              variant="ghost"
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button
              onClick={handleConfirmOrder}
              disabled={!user}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {user ? 'تأكيد الطلب' : 'يرجى تسجيل الدخول أولاً'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;

# دليل النشر على GitHub Pages

## الخطوات المطلوبة لنشر الموقع على GitHub

### 1. إنشاء مستودع على GitHub

1. اذهب إلى [GitHub.com](https://github.com)
2. انقر على "New repository"
3. اسم المستودع: `mark-store` (أو أي اسم تريده)
4. اجعل المستودع عام (Public)
5. انقر على "Create repository"

### 2. رفع الكود إلى GitHub

```bash
# في مجلد المشروع
git init
git add .
git commit -m "Initial commit - مارك ستور"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mark-store.git
git push -u origin main
```

### 3. تفعيل GitHub Pages

1. اذهب إلى إعدادات المستودع (Settings)
2. انتقل إلى قسم "Pages" من القائمة الجانبية
3. في "Source" اختر "GitHub Actions"
4. سيتم تفعيل النشر التلقائي

### 4. انتظار النشر

- بعد رفع الكود، سيبدأ عملية البناء والنشر تلقائياً
- يمكنك مراقبة التقدم في تبويب "Actions"
- عادة تستغرق العملية 2-5 دقائق

### 5. الوصول للموقع

بعد انتهاء النشر، سيكون الموقع متاحاً على:
```
https://YOUR_USERNAME.github.io/mark-store/
```

## ملاحظات مهمة

### للمطورين:
- الموقع يستخدم التخزين المحلي (localStorage) على GitHub Pages
- البيانات ستكون مؤقتة وتختفي عند مسح بيانات التصفح
- لا يمكن استخدام الـ backend API على GitHub Pages

### للمستخدمين:
- الموقع سيعمل بشكل كامل مع جميع المميزات
- البيانات ستحفظ في متصفحك المحلي
- يمكنك إضافة المنتجات والفئات والمراجعات

## استكشاف الأخطاء

### إذا لم يعمل النشر:
1. تأكد أن المستودع عام (Public)
2. تحقق من تبويب "Actions" للأخطاء
3. تأكد أن الملف `.github/workflows/deploy.yml` موجود

### إذا لم يظهر الموقع:
1. انتظر 5-10 دقائق إضافية
2. تحقق من إعدادات Pages
3. جرب الرابط في متصفح خاص (Incognito)

## تحديث الموقع

لتحديث الموقع، ما عليك سوى:
```bash
git add .
git commit -m "تحديث الموقع"
git push
```

سيتم إعادة بناء ونشر الموقع تلقائياً.
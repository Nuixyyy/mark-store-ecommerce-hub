#!/bin/bash

# سكريبت نشر مارك ستور على GitHub Pages
# Mark Store GitHub Pages Deployment Script

echo "🚀 بدء عملية نشر مارك ستور على GitHub Pages"
echo "Starting Mark Store deployment to GitHub Pages"

# التحقق من وجود Git
if ! command -v git &> /dev/null; then
    echo "❌ Git غير مثبت. يرجى تثبيت Git أولاً"
    echo "Git is not installed. Please install Git first."
    exit 1
fi

# التحقق من وجود Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً"
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# إنشاء مجلد git إذا لم يكن موجوداً
if [ ! -d ".git" ]; then
    echo "📁 إنشاء مستودع Git جديد..."
    echo "Creating new Git repository..."
    git init
    git branch -M main
fi

# إضافة جميع الملفات
echo "📋 إضافة الملفات..."
echo "Adding files..."
git add .

# إنشاء commit
echo "💾 إنشاء commit..."
echo "Creating commit..."
git commit -m "Deploy Mark Store - $(date '+%Y-%m-%d %H:%M:%S')"

# طلب رابط المستودع من المستخدم إذا لم يكن مضافاً
if ! git remote get-url origin &> /dev/null; then
    echo ""
    echo "🔗 يرجى إدخال رابط مستودع GitHub:"
    echo "Please enter your GitHub repository URL:"
    echo "مثال: https://github.com/username/mark-store.git"
    echo "Example: https://github.com/username/mark-store.git"
    read -p "> " repo_url
    
    if [ -z "$repo_url" ]; then
        echo "❌ لم يتم إدخال رابط المستودع"
        echo "Repository URL not provided"
        exit 1
    fi
    
    git remote add origin "$repo_url"
fi

# رفع الكود
echo "📤 رفع الكود إلى GitHub..."
echo "Pushing code to GitHub..."
git push -u origin main

echo ""
echo "✅ تم رفع الكود بنجاح!"
echo "Code uploaded successfully!"
echo ""
echo "📋 الخطوات التالية:"
echo "Next steps:"
echo "1. اذهب إلى مستودعك على GitHub"
echo "   Go to your GitHub repository"
echo "2. انتقل إلى Settings > Pages"
echo "   Navigate to Settings > Pages"
echo "3. اختر 'GitHub Actions' كمصدر"
echo "   Select 'GitHub Actions' as source"
echo "4. انتظر انتهاء عملية البناء (2-5 دقائق)"
echo "   Wait for build to complete (2-5 minutes)"
echo ""
echo "🌐 سيكون موقعك متاحاً على:"
echo "Your site will be available at:"
echo "https://YOUR_USERNAME.github.io/mark-store/"
echo ""
echo "📚 لمزيد من التفاصيل، اقرأ ملف DEPLOYMENT.md"
echo "For more details, read DEPLOYMENT.md"
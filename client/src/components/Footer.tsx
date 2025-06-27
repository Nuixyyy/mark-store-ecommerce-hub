
import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-purple-900 to-purple-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h3 className="text-white text-lg font-semibold mb-6">تواصل معنا</h3>
          
          <div className="flex flex-col items-center space-y-4 mb-6 md:flex-row md:justify-center md:space-y-0 md:space-x-8">
            {/* Instagram */}
            <a
              href="https://instagram.com/mark_store_official"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
            >
              <Instagram className="h-6 w-6" />
              <span>انستغرام</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/9647731954787"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
            >
              <MessageCircle className="h-6 w-6" />
              <span>واتساب</span>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@mark_store1?_t=ZS-8xWkWCjjXRU&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
            >
              <div className="h-6 w-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                T
              </div>
              <span>تيك توك</span>
            </a>
          </div>

          <div className="border-t border-purple-700 pt-4">
            <p className="text-purple-300">
              Powered by{' '}
              <a
                href="https://instagram.com/imis2i"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-200 hover:text-white transition-colors font-semibold"
              >
                Nuix
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

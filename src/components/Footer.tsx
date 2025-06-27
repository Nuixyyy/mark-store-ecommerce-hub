
import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h3 className="text-white text-lg font-semibold mb-6">تواصل معنا</h3>
          
          <div className="flex justify-center items-center space-x-8 mb-6">
            {/* Instagram */}
            <a
              href="https://instagram.com/imis2i"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
            >
              <Instagram className="h-6 w-6" />
              <span>mark_store_official</span>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@mark_store1?_t=ZS-8xWkWCjjXRU&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <div className="h-6 w-6 bg-purple-400 rounded flex items-center justify-center text-white text-xs font-bold">
                T
              </div>
              <span>mark_store1</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/9647731954787"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <MessageCircle className="h-6 w-6" />
              <span>+964 773 195 4787</span>
            </a>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-400">
              Powered by{' '}
              <a
                href="https://instagram.com/imis2i"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-semibold"
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

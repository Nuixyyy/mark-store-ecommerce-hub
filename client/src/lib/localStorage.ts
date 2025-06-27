// Local storage utilities for GitHub Pages deployment
import { FrontendProduct, FrontendCategory, FrontendReview, FrontendUser } from './typeAdapters';

const STORAGE_KEYS = {
  PRODUCTS: 'mark_store_products',
  CATEGORIES: 'mark_store_categories',
  REVIEWS: 'mark_store_reviews',
  USER: 'mark_store_user',
  CART: 'mark_store_cart',
} as const;

// Default data for initialization
const defaultCategories: FrontendCategory[] = [];

const defaultProducts: FrontendProduct[] = [];

const defaultReviews: FrontendReview[] = [];

// Generic storage functions
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key ${key}:`, error);
    return defaultValue;
  }
};

export const setToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage for key ${key}:`, error);
  }
};

// Specific storage functions
export const getProducts = (): FrontendProduct[] => 
  getFromStorage(STORAGE_KEYS.PRODUCTS, defaultProducts);

export const setProducts = (products: FrontendProduct[]): void => 
  setToStorage(STORAGE_KEYS.PRODUCTS, products);

export const getCategories = (): FrontendCategory[] => 
  getFromStorage(STORAGE_KEYS.CATEGORIES, defaultCategories);

export const setCategories = (categories: FrontendCategory[]): void => 
  setToStorage(STORAGE_KEYS.CATEGORIES, categories);

export const getReviews = (): FrontendReview[] => 
  getFromStorage(STORAGE_KEYS.REVIEWS, defaultReviews);

export const setReviews = (reviews: FrontendReview[]): void => 
  setToStorage(STORAGE_KEYS.REVIEWS, reviews);

export const getCurrentUser = (): FrontendUser | null => 
  getFromStorage(STORAGE_KEYS.USER, null);

export const setCurrentUser = (user: FrontendUser | null): void => 
  setToStorage(STORAGE_KEYS.USER, user);

export const getCart = (): any[] => 
  getFromStorage(STORAGE_KEYS.CART, []);

export const setCart = (cart: any[]): void => 
  setToStorage(STORAGE_KEYS.CART, cart);

// Initialize storage with default data if empty
export const initializeStorage = (): void => {
  if (getCategories().length === 0) {
    setCategories(defaultCategories);
  }
  if (getProducts().length === 0) {
    setProducts(defaultProducts);
  }
  if (getReviews().length === 0) {
    setReviews(defaultReviews);
  }
};
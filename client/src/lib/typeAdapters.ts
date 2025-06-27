import type { Product as BackendProduct, User as BackendUser, Review as BackendReview, Category as BackendCategory } from '@shared/schema';

// Frontend types that maintain compatibility with existing components
export interface FrontendProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface FrontendCartItem extends FrontendProduct {
  quantity: number;
}

export interface FrontendUser {
  id: string;
  fullName: string;
  phoneNumber: string;
  isAdmin: boolean;
}

export interface FrontendReview {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FrontendCategory {
  id: string;
  name: string;
}

// Type conversion functions
export const convertProductFromBackend = (backendProduct: BackendProduct, categories: BackendCategory[]): FrontendProduct => {
  const category = categories.find(c => c.id === backendProduct.categoryId);
  return {
    id: String(backendProduct.id),
    name: backendProduct.name,
    description: backendProduct.description,
    price: Number(backendProduct.price),
    image: backendProduct.image,
    category: category?.name || 'Unknown'
  };
};

export const convertProductToBackend = (frontendProduct: Omit<FrontendProduct, 'id'>, categories: BackendCategory[]): Omit<BackendProduct, 'id'> => {
  const category = categories.find(c => c.name === frontendProduct.category);
  return {
    name: frontendProduct.name,
    description: frontendProduct.description,
    price: String(frontendProduct.price),
    image: frontendProduct.image,
    categoryId: category?.id || 1
  };
};

export const convertUserFromBackend = (backendUser: BackendUser): FrontendUser => ({
  id: String(backendUser.id),
  fullName: backendUser.fullName,
  phoneNumber: backendUser.phoneNumber,
  isAdmin: backendUser.isAdmin
});

export const convertUserToBackend = (frontendUser: Omit<FrontendUser, 'id'>): Omit<BackendUser, 'id'> => ({
  fullName: frontendUser.fullName,
  phoneNumber: frontendUser.phoneNumber,
  isAdmin: frontendUser.isAdmin
});

export const convertReviewFromBackend = (backendReview: BackendReview): FrontendReview => ({
  id: String(backendReview.id),
  customerName: backendReview.customerName,
  rating: backendReview.rating,
  comment: backendReview.comment,
  date: backendReview.date instanceof Date ? backendReview.date.toISOString() : String(backendReview.date)
});

export const convertReviewToBackend = (frontendReview: Omit<FrontendReview, 'id' | 'date'>): Omit<BackendReview, 'id' | 'date'> => ({
  customerName: frontendReview.customerName,
  rating: frontendReview.rating,
  comment: frontendReview.comment
});

export const convertCategoryFromBackend = (backendCategory: BackendCategory): FrontendCategory => ({
  id: String(backendCategory.id),
  name: backendCategory.name
});

export const convertCategoryToBackend = (frontendCategory: Omit<FrontendCategory, 'id'>): Omit<BackendCategory, 'id'> => ({
  name: frontendCategory.name
});
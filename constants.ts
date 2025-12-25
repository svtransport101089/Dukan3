
import { Product } from './types';

export const STORE_NAME = "Parthi's Digital Shop";
export const OWNER_NAME = "Parthiban D";
export const UPI_ID = "parthi101089-3@okaxis";
export const CURRENCY = "INR";
export const LOCATION = "Chennai, Tamil Nadu";

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Tea',
    price: 5,
    image: 'https://images.unsplash.com/photo-1544787210-2213d84ad96b?q=80&w=400&auto=format&fit=crop',
    description: 'Hot, refreshing ginger tea.'
  },
  {
    id: '2',
    name: 'Coffee',
    price: 10,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400&auto=format&fit=crop',
    description: 'Strong aromatic filter coffee.'
  },
  {
    id: '3',
    name: 'Biscuit',
    price: 2,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=400&auto=format&fit=crop',
    description: 'Crispy sweet digestive biscuit.'
  },
  {
    id: '4',
    name: 'Pen',
    price: 3,
    image: 'https://images.unsplash.com/photo-1585336139118-132f7f21503e?q=80&w=400&auto=format&fit=crop',
    description: 'Smooth writing blue ink pen.'
  },
  {
    id: '5',
    name: 'Notebook',
    price: 7,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=400&auto=format&fit=crop',
    description: 'A5 size ruled notebook for notes.'
  }
];

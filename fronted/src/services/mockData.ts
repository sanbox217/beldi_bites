import { Cook, Product, Category } from '../types';

export const mockCooks: Cook[] = [
  {
    id: '1',
    displayNameAr: 'حليمة - مخبزة البيت',
    displayNameFr: 'Halima - Boulangerie Maison',
    bioAr: 'طباخة ماهرة متخصصة في المسمن والبغرير التقليدي',
    bioFr: 'Cuisinière expérimentée spécialisée dans le msemen et beghrir traditionnels',
    avatarUrl: 'https://images.unsplash.com/photo-1559659888-c5b2e63c4846?w=150&h=150&fit=crop&crop=face',
    coverUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 127,
    neighborhood: 'درب السلطان',
    location: { lat: 33.5731, lng: -7.5898 },
    delivery: {
      enabled: true,
      radiusKm: 5,
      baseFeeMAD: 10,
      perKmMAD: 2
    },
    kitchenHours: {
      monday: { open: '07:00', close: '18:00', enabled: true },
      tuesday: { open: '07:00', close: '18:00', enabled: true },
      wednesday: { open: '07:00', close: '18:00', enabled: true },
      thursday: { open: '07:00', close: '18:00', enabled: true },
      friday: { open: '07:00', close: '18:00', enabled: true },
      saturday: { open: '08:00', close: '16:00', enabled: true },
      sunday: { open: '08:00', close: '16:00', enabled: false }
    },
    verified: true,
    badges: ['bestseller', 'verified', 'on-time']
  },
  {
    id: '2',
    displayNameAr: 'مطبخ خديجة',
    displayNameFr: 'Cuisine de Khadija',
    bioAr: 'تطبخ أشهى الطاجين والحلويات المنزلية',
    bioFr: 'Spécialiste des tajines et pâtisseries maison',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    coverUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=300&fit=crop',
    rating: 4.6,
    reviewCount: 89,
    neighborhood: 'أكدال',
    location: { lat: 33.5651, lng: -7.6086 },
    delivery: {
      enabled: true,
      radiusKm: 3,
      baseFeeMAD: 15,
      perKmMAD: 3
    },
    kitchenHours: {
      monday: { open: '09:00', close: '17:00', enabled: true },
      tuesday: { open: '09:00', close: '17:00', enabled: true },
      wednesday: { open: '09:00', close: '17:00', enabled: true },
      thursday: { open: '09:00', close: '17:00', enabled: true },
      friday: { open: '14:00', close: '17:00', enabled: true },
      saturday: { open: '09:00', close: '17:00', enabled: true },
      sunday: { open: '09:00', close: '17:00', enabled: true }
    },
    verified: true,
    badges: ['verified', 'weekend-only']
  },
  {
    id: '3',
    displayNameAr: 'أم يوسف للحلويات',
    displayNameFr: 'Oum Youssef Pâtisserie',
    bioAr: 'كراشل وحلويات تقليدية بأجود المكونات',
    bioFr: 'Krachel et pâtisseries traditionnelles avec les meilleurs ingrédients',
    avatarUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face',
    coverUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=300&fit=crop',
    rating: 4.9,
    reviewCount: 203,
    neighborhood: 'الحي المحمدي',
    location: { lat: 33.5611, lng: -7.6392 },
    delivery: {
      enabled: true,
      radiusKm: 8,
      baseFeeMAD: 12,
      perKmMAD: 1.5
    },
    kitchenHours: {
      monday: { open: '06:00', close: '20:00', enabled: true },
      tuesday: { open: '06:00', close: '20:00', enabled: true },
      wednesday: { open: '06:00', close: '20:00', enabled: true },
      thursday: { open: '06:00', close: '20:00', enabled: true },
      friday: { open: '06:00', close: '20:00', enabled: true },
      saturday: { open: '07:00', close: '19:00', enabled: true },
      sunday: { open: '07:00', close: '19:00', enabled: true }
    },
    verified: true,
    badges: ['bestseller', 'verified', 'premium']
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    cookId: '1',
    nameAr: 'مسمن منزلي',
    nameFr: 'Msemen maison',
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop'
    ],
    category: 'msemen',
    priceMAD: 18,
    minQty: 1,
    maxQty: 10,
    leadTimeHours: 1,
    ingredientsAr: 'دقيق، زيت، ملح، ماء',
    ingredientsFr: 'Farine, huile, sel, eau',
    allergens: ['gluten'],
    availableToday: true,
    tags: ['bestseller', 'traditional']
  },
  {
    id: '2',
    cookId: '1',
    nameAr: 'حرشة بالسميد',
    nameFr: 'Harsha au semoule',
    images: [
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop'
    ],
    category: 'harsha',
    priceMAD: 8,
    leadTimeHours: 2,
    ingredientsAr: 'سميد، زبدة، سكر، بيكنغ باودر',
    ingredientsFr: 'Semoule, beurre, sucre, levure chimique',
    allergens: ['gluten', 'dairy'],
    availableToday: true,
    tags: ['traditional', 'breakfast']
  },
  {
    id: '3',
    cookId: '1',
    nameAr: 'بغرير (كريب ألف ثقب)',
    nameFr: 'Beghrir (crêpes mille trous)',
    images: [
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop'
    ],
    category: 'beghrir',
    priceMAD: 22,
    minQty: 1,
    maxQty: 5,
    leadTimeHours: 3,
    ingredientsAr: 'سميد، دقيق، خميرة، ماء دافئ',
    ingredientsFr: 'Semoule, farine, levure, eau tiède',
    allergens: ['gluten'],
    availableToday: true,
    tags: ['bestseller', 'traditional', 'breakfast']
  },
  {
    id: '4',
    cookId: '3',
    nameAr: 'كراشل',
    nameFr: 'Krachel',
    images: [
      'https://images.unsplash.com/photo-1549312081-4af3ba2f516b?w=400&h=400&fit=crop'
    ],
    category: 'sweets',
    priceMAD: 6,
    minQty: 1,
    maxQty: 20,
    leadTimeHours: 4,
    ingredientsAr: 'دقيق، زبدة، سكر، حليب، سمسم',
    ingredientsFr: 'Farine, beurre, sucre, lait, sésame',
    allergens: ['gluten', 'dairy', 'sesame'],
    availableToday: true,
    tags: ['bestseller', 'sweet', 'traditional']
  },
  {
    id: '5',
    cookId: '2',
    nameAr: 'طاجين الدجاج بالزيتون',
    nameFr: 'Tajine de poulet aux olives',
    images: [
      'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=400&fit=crop'
    ],
    category: 'savory',
    priceMAD: 45,
    minQty: 1,
    maxQty: 4,
    leadTimeHours: 6,
    ingredientsAr: 'دجاج، زيتون، بصل، توابل مغربية، زيت زيتون',
    ingredientsFr: 'Poulet, olives, oignons, épices marocaines, huile d\'olive',
    allergens: [],
    availableToday: false,
    tags: ['traditional', 'main-course', 'gluten-free']
  }
];

export const mockCategories: Category[] = [
  { id: 'bread', nameAr: 'خبز', nameFr: 'Pain', nameEn: 'Bread', icon: 'Wheat' },
  { id: 'msemen', nameAr: 'مسمن', nameFr: 'Msemen', nameEn: 'Msemen', icon: 'Circle' },
  { id: 'harsha', nameAr: 'حرشة', nameFr: 'Harsha', nameEn: 'Harsha', icon: 'Sun' },
  { id: 'beghrir', nameAr: 'بغرير', nameFr: 'Beghrir', nameEn: 'Beghrir', icon: 'Layers' },
  { id: 'sweets', nameAr: 'حلويات', nameFr: 'Pâtisseries', nameEn: 'Sweets', icon: 'Cake' },
  { id: 'savory', nameAr: 'مالح', nameFr: 'Salé', nameEn: 'Savory', icon: 'ChefHat' },
  { id: 'glutenFree', nameAr: 'خالي من الغلوتين', nameFr: 'Sans gluten', nameEn: 'Gluten-free', icon: 'Leaf' },
  { id: 'halal', nameAr: 'حلال', nameFr: 'Halal', nameEn: 'Halal', icon: 'Check' }
];
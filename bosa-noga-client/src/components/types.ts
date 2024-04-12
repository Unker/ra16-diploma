export interface ICategory {
  id: number;
  title: string;
}

export interface IItemShort {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
}

export interface IItemFull {
  id: number;
  category: number;
  title: string;
  images: string[];
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  season: string;
  heelSize: string;
  price: number;
  sizes: {
    size: string;
    available: boolean;
  }[];
}

export interface ICartItem {
  id: number;
  size: string;
  title: string;
  count: number;
  price: number;
}

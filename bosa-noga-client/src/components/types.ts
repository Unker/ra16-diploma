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

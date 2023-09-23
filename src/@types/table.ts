export type OrderSort = 'asc' | 'desc';

export interface HeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
  hideSortIcon: boolean;
  disablePadding: boolean;
}

export interface CategoryTable {
  imageUrl: string;
  name: string;
  code: string;
  status: string;
}

export interface ProductTable {
  image: string;
  name: string;
  code: string;
  historicalPrice: number;
  type: string;
  categoryId: string;
  status: string;
}

export interface StoreTable {
  name: string;
  logoUrl: string;
  kitchenCenter: string;
  brand: string;
  partner: number;
  status: string;
}

export interface KitchenCenterHeadCell {
  disablePadding: boolean;
  id: keyof KitchenCentersTable;
  label: string;
  numeric: boolean;
}

export interface KitchenCentersTable {
  imageUrl: string;
  title: string;
  address: string;
  status: string;
}

// Kitchen
export interface KitchenTable {
  kitchenId: number;
  kitchenImgUrl: string;
  kitchenName: string;
  brandImgUrl: string;
  brandName: string;
  status: string;
}

// Brand
export interface BrandTable {
  brandId: number;
  brandImgUrl: string;
  brandName: string;
  address: string;
  brandManager: string;
  status: string;
}

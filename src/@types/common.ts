import { NavigateFunction } from 'react-router-dom';

export interface OptionParams {
  keySearchName?: string | null;
  searchValue?: string | null;
  searchName?: string | null;
  keyStatusFilter?: string | null;
  itemsPerPage?: number | null | string;
  currentPage?: number | null | string;
  isGetAll?: boolean | null | string;
  type?: boolean | null | string;
  idBrand?: null | number | string;
  idKitchenCenter?: null | number | string;
  idCategory?: null | number | string;
  idStore?: null | number | string;
}

export interface IdParams {
  brandId?: number;
  storeId?: number;
  kitchenCenterId?: number;
  categoryId?: number;
  productId?: number;
  partnerId?: number;
}
export interface ListParams {
  optionParams: OptionParams;
  navigate: NavigateFunction;
}

export interface OneModelParams {
  idParams: IdParams;
  navigate: NavigateFunction;
}

export interface Params<T> {
  data?: T;
  pathname?: string;
  idParams?: IdParams;
  optionParams?: OptionParams;
  navigate: NavigateFunction;
}

export interface LoginResponse {
  accountId: number;
  email: string;
  roleName: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface MessageResponse {
  message: string;
}

export interface ListResponse<T> {
  totalPage: number;
  numberItems: number;
  data: T[];
}

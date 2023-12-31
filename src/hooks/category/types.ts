export type Category = {
  id: number;
  categoryName: string;
  categoryImage: string;
};
export type SubCategory = {
  id: number;
  subCategoryName: string;
  categoryId: number;
  subCategoryImage: string;
};

export interface ProductExtra {
  [key: string]: string[];
}

export type ChildCategory = {
  id: number;
  productName: string;
  productImage: string;
  productDescription: string;
  productQuantity: number;
  productPrice: number;
  productTax: number;
  productSize: string;
  productType: string;
  productAddon: number;
  productExtra: ProductExtra;
};

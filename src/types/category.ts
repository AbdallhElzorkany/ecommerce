export interface CategoriesResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
    prevPage?: number;
  };
  data: Category[];
}
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
export interface CategoryResponse {
  data: Category;
}
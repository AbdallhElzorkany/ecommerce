export interface BrandsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
    prevPage?: number;
  };
  data: Brand[];
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

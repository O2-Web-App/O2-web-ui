export type ProductDetail = {
  images: string[];
};


export type DataType = {
  uuid: string;
  category_name: string;
  name: string;
  description: string;
  price: string;
  discount_percentage: string;
  discounted_price: number;
  stock: number;
  is_recommended: number;
  average_rating: number;
  single_image: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

export type RecommendationType = {
  data: {
    data: DataType[];
    metadata: {
      page: number;
      page_size: number;
      total_items: number;
      total_pages: number;
    };
  };
};
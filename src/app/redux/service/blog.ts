import { BlogResponse } from "@/app/types/BlogType";
import { o2API} from "../api";
export const blogsApi = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get product detail
    getAllBlogs: builder.query<BlogResponse, void>({
      query: () => ({
        url: `http://178.128.115.99/api/blogs/`,
        method: "GET",
      }),
    }),

    getBlogDetail: builder.query<BlogResponse, {uuid: string}>({
        query: ({uuid}) => ({
          url: `http://178.128.115.99/api/blogs/${uuid}`,
          method: "GET",
        }),
      }),
  }),
});

export const { 
    useGetAllBlogsQuery,
    useGetBlogDetailQuery,
 } = blogsApi;

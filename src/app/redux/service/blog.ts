import { BlogCommentsResponse, GetCommentsResponse, LikeResponse } from "@/app/types/BlogType";
import { o2API } from "../api";
export const blogsApi = o2API.injectEndpoints({
  endpoints: (builder) => ({
  
    postComment: builder.mutation<BlogCommentsResponse, { uuid: string; content: string; parent_uuid?: string }>(
      {
        query: ({ uuid, content, parent_uuid }) => ({
          url: `http://178.128.115.99/api/blogs/${uuid}/comment`,
          method: "POST",
          body: parent_uuid ? { content, parent_uuid } : { content }, // Only include parent_uuid if provided
          headers: {
            "Content-Type": "application/json",
          },
        }),
        invalidatesTags: ["Blogs"]
      }
    ),
    
    getComment: builder.query<GetCommentsResponse, { uuid: string; }>(
      {
        query: ({ uuid }) => ({
          url: `http://178.128.115.99/api/blogs/${uuid}/comments`,
          method: "GET",
          
        }),
        providesTags: ["Blogs"]
      }
    ),
    postLike: builder.mutation<LikeResponse, { uuid: string; }>(
      {
        query: ({ uuid }) => ({
          url: `http://178.128.115.99/api/blogs/${uuid}/like`,
          method: "POST",
          
        }),
        invalidatesTags: ["Blogs"]
      }
    ),
    deleteComment: builder.mutation<GetCommentsResponse, {uuid:string;}>({
      query: ({uuid})=>({
        url: `http://178.128.115.99/api/blogs${uuid}/comments`,
        method: "DELETE"
      }),
      invalidatesTags: ["Blogs"]
    }),
    
    
  }),
});

export const {
  usePostCommentMutation,
  useGetCommentQuery,
  usePostLikeMutation,
  useDeleteCommentMutation,
} = blogsApi;

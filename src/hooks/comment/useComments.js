import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment, getAllComments } from "@/api/comment.api";
import useCommentStore from "@/store/comments.store";

export const useCommentsByPostId = (postId, enabled = true, page) => {
  const setComments = useCommentStore((s) => s.setComments);
  const comments = useCommentStore((s) => s.comments);
  const setPagination = useCommentStore((s) => s.setPagination);
  return useQuery({
    queryKey: ["comments", postId, page],
    queryFn: async () => {
      const res = await getAllComments(postId, page);
      // Your API directly returns the structure we need
      const data = res?.data || {};

      const newComments = data?.comments || [];
      const pagination = data?.pagination || {};
      const mergedComments =
        page === 1 ? newComments : [...comments, ...newComments];
      setPagination(pagination);
      setComments(mergedComments);
      // Calculate if we're on the last page based on pagination info
      const isLastPage = page >= pagination.totalPages;
      // If it's the first page, replace comments, otherwise append
      return {
        newComments: mergedComments,
        pagination,
        isLastPage,
      };
    },
    enabled: !!postId && enabled, // only run if postId exists and comments are toggled on
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const addComment = useCommentStore((s) => s.addComment);

  return useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
    },
  });
};

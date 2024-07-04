import instance from "@/config/instance";
type createCommentType = {
  slug: string;
  comment: string;
};
type createCommentReplyType = {
  comment: string;
  parentComment?: string;
  parentReply?: string;
};
export const createComment = (data: createCommentType) => {
  const uri = "/comments";
  return instance.post(uri, data);
};
export const getCommentByProductId = (slug: string, query?: string) => {
  const uri =
    `/comments/${slug}/commentsByIdProduct` + (query ? `?${query}` : "");
  return instance.get(uri);
};
export const deleteCommentById = (commentId: string) => {
  const uri = `/comments/${commentId}/deleteByCommentId`;
  return instance.delete(uri);
};
export const updateCommentById = (data: {
  commentId: string;
  comment: string;
}) => {
  const uri = `/comments/updateByCommentId`;
  return instance.patch(uri, data);
};
// Comment Reply

export const createCommentReply = (data: createCommentReplyType) => {
  const uri = "/comments/reply";
  return instance.post(uri, data);
};
export const updateCommentReplyById = (data: {
  commentReplyId: string;
  comment: string;
}) => {
  const uri = `/comments/reply/updateByCommentReplyId`;
  return instance.patch(uri, data);
};
export const deleteCommentReplyById = (commentId: string) => {
  const uri = `/comments/reply/${commentId}/deleteByCommentReplyId`;
  return instance.delete(uri);
};
// Like and dislike
type LikeDislikeType = {
  commentId?: string;
  commentReplyId?: string;
};
export const likeOrUnlikeComment = (
  data: LikeDislikeType,
  action: string = "like"
) => {
  const uri = `/comments/liked/${action}`;
  return instance.post(uri, data);
};
export const dislikeOrUndislikeComment = (
  data: LikeDislikeType,
  action: string = "dislike"
) => {
  const uri = `/comments/disliked/${action}`;
  return instance.post(uri, data);
};

import instance from "@/config/instance";
type addToCartType = {
  slug: string;
  colorId: string;
  sizeId: string;
  quantity: number;
};
type updateQuantityItemCartType = {
  itemId: string;
  quantity: number;
};
type updateVariantItemCart = {
  itemId: string;
  productId: string;
  sizeId: string;
  colorId: string;
};
export const addToCartAPI = (data: addToCartType) => {
  const uri = "/cart/addToCart";
  return instance.post(uri, data);
};
export const getMyShoppingCart = () => {
  const uri = "/cart/myShoppingCart";
  return instance.get(uri);
};
export const updateQuantityItemCart = (data: updateQuantityItemCartType) => {
  const uri = "/cart/updateQuantityItemCart";
  return instance.patch(uri, data);
};
export const getCartCheckout = (query: string) => {
  const uri = `/cart/checkout${query}`;
  return instance.get(uri);
};
export const removeItemsCart = (itemIds: string[] | string) => {
  if (typeof itemIds == "object" && itemIds.length > 0) {
    itemIds = itemIds.join(",");
  }
  const uri = `/cart/removeItemsCart?itemIds=${itemIds}`;
  return instance.delete(uri);
};
export const updateVariantItemCart = (data: updateVariantItemCart) => {
  const uri = "/cart/updateVariantItemCart";
  return instance.patch(uri, data);
};

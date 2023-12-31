export const ApiEndpoints = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    forgotPassword: '/api/forget-password',
    resetPassword: '/api/reset-password',
  },
  tokenUrl: {
    refreshToken: '/api/auth/refresh',
  },
  category: {
    getCategoryList: '/api/auth/food_category',
    getSubCategoryList: '/api/auth/sub_category/{CATEGORY_ID}',
    getMenuList: '/api/auth/menu_list/{SUBCATEGORY_ID}',
  },
  user: {
    getProfile: '/api/auth/user-profile',
    updateProfile: '/api/auth/update-user-profile',
    updateUserPassword: '/api/auth/update-password',
  },
  cart: {
    getCartList: '/api/auth/get_cart_list',
    addToCart: '/api/auth/add_to_card',
    qtyUpdate: '/api/auth/qty_update',
    removeCart: '/api/auth/remove-item-cart',
  },
  address: {
    getAddressList: '/api/auth/user-address-list',
    getParticularAddressList: '/api/auth/particular-address/{ADDRESS_ID}',
    addNewAddress: '/api/auth/create-address',
    editAddress: '/api/auth/update-address',
    deleteAddress: '/api/auth/delete-address/{ADDRESS_ID}',
  },
  snacks: {
    getSnacksList: '/api/auth/get-snacks-list',
    getPopularFoodList: '/api/auth/list_of-popular-food',
    getLatestFoodList: '/api/auth/list_of-latest-food',
  },
  order: {
    getOrderList: '/api/auth/get-order-list',
    getOrderDetails: '/api/auth/get-order-detail/{ORDER_ID}',
  },
  checkout: {
    checkoutUrl: '/api/checkout',
  },
};

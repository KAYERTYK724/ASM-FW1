export const API_ENDPOINTS = {
  auth: {
    login: '/users/login',
  },
  CATEGORY: {
    LIST: "/categories/list",
    GET_BY_ID: (id: number) => `/categories/${id}`,
    ADD: "/categories/add",
    UPDATE: (id: number) => `/categories/${id}`,
    DELETE: (id: number) => `/categories/${id}`,
  },

  PRODUCT: {
    LIST: "/products/list",
    GET_BY_ID: (id: number) => `/products/${id}`,
    ADD: "/products/add",
    UPDATE: (id: number) => `/products/${id}`,
    DELETE: (id: number) => `/products/${id}`,
  },

  BLOG: {
    LIST: "/blogs/list",
    GET_BY_ID: (id: number) => `/blogs/${id}`,
    ADD: "/blogs/add",
    UPDATE: (id: number) => `/blogs/${id}`,
    DELETE: (id: number) => `/blogs/${id}`,
  },

  COMMENT: {
    LIST: "/comments/list",
    GET_BY_ID: (id: number) => `/comments/${id}`,
    ADD: "/comments/add",
    UPDATE: (id: number) => `/comments/${id}`,
    DELETE: (id: number) => `/comments/${id}`,
  },



  ORDER: {
    LIST: "/orders/list",
    GET_BY_ID: (id: number) => `/orders/${id}`,
    ADD: "/orders/add",
    UPDATE: (id: number) => `/orders/${id}`,
    DELETE: (id: number) => `/orders/${id}`,
    CHECKOUT: "/orders/checkout"
  },

  ORDER_DETAIL: {
    LIST: "/order-details/list",
    GET_BY_ID: (id: number) => `/order-details/${id}`,
    GET_BY_USER: (userId: number) => `/order-details/cart/${userId}`,
    ADD: "/order-details/add",
    UPDATE: (id: number) => `/order-details/${id}`,
    DELETE: (id: number) => `/order-details/${id}`,
  },

  USER: {
    LIST: "/users/list",
    REGISTER: '/users/register',
    LOGIN: '/users/login',
  }
}

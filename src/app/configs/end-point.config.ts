export const API_ENDPOINTS = {
  CATEGORY : {
    LIST: "/categories/list",
    GET_BY_ID: (id: number) => `/categories/${id}`,
    ADD: "/categories/add",
    UPDATE: (id: number) => `/categories/update/${id}`,
    DELETE: (id: number) => `/categories/delete/${id}`,
  },

  PRODUCT : {
    LIST: "/products/list",
    GET_BY_ID: (id: number) => `/products/${id}`,
    ADD: "/products/add",
    UPDATE: (id: number) => `/products/update/${id}`,
    DELETE: (id: number) => `/products/delete/${id}`,
  },

  BLOG : {
    LIST: "/blogs/list",
    GET_BY_ID: (id: number) => `/blogs/${id}`,
    ADD: "/blogs/add",
    UPDATE: (id: number) => `/blogs/update/${id}`,
    DELETE: (id: number) => `/blogs/delete/${id}`,
  }
}

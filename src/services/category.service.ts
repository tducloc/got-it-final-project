import authHeader from "./auth-header.service";

const API_URL = `${process.env.REACT_APP_URL}/categories`;

type CategoryPayload = {
  name?: string;
  description?: string;
  image_url?: string;
};

const CategoryService = {
  getCategories(offset: number = 0, limit: number = 20) {
    return fetch(`${API_URL}?offset=${offset}&limit=${limit}`, {
      method: "GET",
    });
  },

  createCategories(payload: CategoryPayload) {
    return fetch(API_URL, {
      method: "POST",
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  },

  editCategory(id: string, payload: CategoryPayload) {
    return fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });
  },
};

export default CategoryService;

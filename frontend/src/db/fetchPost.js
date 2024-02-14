import axios from "axios";

export async function fetchCreatePost(formData) {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_BACKEND}posts/create`,
      {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        subCategoryId: formData.subCategory,
        categoryId: formData.category,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    if (data) {
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error.response;
  }
}

export async function fetchUserPosts(id) {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND}posts/getByUser/${id}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response;
  }
}

export async function fetchDeletePost(id) {
  try {
    const data = await axios.delete(
      `${import.meta.env.VITE_BACKEND}posts/deletepost/${id}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response;
  }
}

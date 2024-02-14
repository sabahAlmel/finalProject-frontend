import axios from "axios";

export async function fetchCreatePost(formData) {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_BACKEND}posts/create`,
      {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        subCategoryId: formData.category,
        categoryId: formData.subCategory,
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

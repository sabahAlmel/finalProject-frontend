import axios from "axios";

export async function fetchCategories() {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND}category/getall`
    );
    if (data) {
      return data.data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error.response;
  }
}

export async function fetchCreateCategory(formData) {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_BACKEND}category/create`,
      formData
    );
    if (data) {
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error.response;
  }
}

export async function fetchUpdateCategory(id, formData) {
  try {
    const data = await axios.put(
      `${import.meta.env.VITE_BACKEND}category/update/${id}`,
      formData
    );
    if (data) {
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error.response;
  }
}

export async function fetchDeleteCategory(id) {
  try {
    const data = await axios.delete(
      `${import.meta.env.VITE_BACKEND}category/delete/${id}`
    );
    if (data) {
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error.response;
  }
}

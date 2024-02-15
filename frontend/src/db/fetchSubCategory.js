import axios from "axios";

export async function fetchSubCategories() {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND}subCategory/getall`
    );
    if (data) {
      return data.data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error.response;
  }
}

export async function fetchCreateSubCategory(formData) {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_BACKEND}subCategory/create`,
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

export async function fetchUpdateSubCategory(id, formData) {
  try {
    const data = await axios.put(
      `${import.meta.env.VITE_BACKEND}subCategory/update/${id}`,
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

export async function fetchDeleteSubCategory(id) {
  try {
    const data = await axios.delete(
      `${import.meta.env.VITE_BACKEND}subCategory/delete/${id}`
    );
    if (data) {
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error.response;
  }
}

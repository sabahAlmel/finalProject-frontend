import axios from "axios";

export async function fetchCategories() {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND}category/getAll`
    );
    if (data) {
      return data.data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error.response;
  }
}

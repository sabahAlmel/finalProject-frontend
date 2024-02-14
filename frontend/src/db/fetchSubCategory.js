import axios from "axios";

export async function fetchSubCategories() {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND}subCategory/getAll`
    );
    if (data) {
      return data.data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error.response;
  }
}

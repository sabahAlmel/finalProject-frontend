import axios from "axios";

export async function fetchUpdateUser(userId, formData) {
  try {
    const data = await axios.put(
      `${import.meta.env.VITE_BACKEND}users/update/${userId}`,
      formData,
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

export async function fetchDeleteUser(userId) {
  try {
    const data = await axios.delete(
      `${import.meta.env.VITE_BACKEND}users/delete/${userId}`,
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

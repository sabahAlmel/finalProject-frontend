import axios from "axios";

export async function fetchSignUp(formData) {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_BACKEND}auth/signup`,
      {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }
    );
    if (data && data.data.token) {
      localStorage.setItem("token", `Bearer ${data.data.token}`);
      return data.data;
    }
  } catch (error) {
    if (error.response.data.success === false) {
      return error.response.data;
    }
  }
}

export async function fetchUser() {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND}users/readOne`
    );
    if (data) {
      console.log(data);
      return data.data.user;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchLogin(formData) {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_BACKEND}auth/signin`,
      {
        email: formData.email,
        password: formData.password,
      }
    );
    if (data && data.data.token) {
      localStorage.setItem("token", `Bearer ${data.data.token}`);
      return data.data;
    }
  } catch (error) {
    if (error.response.data.success === false) {
      return error.response.data;
    }
  }
}

export async function fetchGoogle(result) {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_BACKEND}auth/google`,
      {
        name: result.user.displayName,
        email: result.user.email,
        googlePhotoUrl: result.user.photoURL,
      }
    );
    if (data && data.data.token) {
      localStorage.setItem("token", `Bearer ${data.data.token}`);
      return data.data;
    }
  } catch (error) {
    if (data.success === false) {
      return data.message;
    }
  }
}

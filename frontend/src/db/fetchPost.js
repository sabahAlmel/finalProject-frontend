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

export async function fetchPostsWithoutPagination() {
  try {
    const data = await axios.get(`${import.meta.env.VITE_BACKEND}posts/getall`);
    if (data) {
      return data.data.posts;
    }
  } catch (error) {
    return error.response;
  }
}
export async function fetchPostsWithPostId(postId) {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND}posts/getall?postId=${postId}`
    );
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response;
  }
}

export async function fetchPostsPagination(index) {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND}posts/getall?startIndex=${index}`
    );
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response;
  }
}

export async function fetchPostSlug(slug) {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND}posts/getall?slug=${slug}`
    );
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response;
  }
}

export async function fetchPostLimit(nb) {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND}posts/getall?limit=${nb}`
    );
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response;
  }
}

export async function fetchSearchPost(search) {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND}posts/getall?${search}`
    );
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response;
  }
}

export async function fetchMostRecommendPost(nb) {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND}posts/getRecommendedPost?limit=${nb}`
    );
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response;
  }
}

export async function fetchRecommendPostByCategory(categoryId, nb) {
  try {
    const data = await axios.get(
      `${
        import.meta.env.VITE_BACKEND
      }posts/getRecommendedByCategory?categoryId=${categoryId}&limit=${nb}`
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

export async function fetchUpdatePost(id, formData) {
  console.log(formData, id);
  try {
    const data = await axios.put(
      `${import.meta.env.VITE_BACKEND}posts/updatepost/${id}`,
      {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        subCategoryId: formData.subCategoryId._id
          ? formData.subCategoryId._id
          : formData.subCategoryId,
        categoryId: formData.categoryId._id
          ? formData.categoryId._id
          : formData.categoryId,
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

export async function fetchRecommendPost(postId) {
  try {
    const data = await axios.put(
      `${import.meta.env.VITE_BACKEND}posts/recommended/${postId}`,
      null,
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

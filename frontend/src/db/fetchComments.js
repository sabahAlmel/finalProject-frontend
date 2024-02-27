import axios from "axios";

export async function fetchCreateComment(comment, postId, currentUser) {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_BACKEND}comments/create`,
      {
        content: comment,
        postId: postId,
        userId: currentUser._id,
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

export async function fetchEditComment(commentId, content) {
  try {
    const data = await axios.put(
      `${import.meta.env.VITE_BACKEND}comments/editComment/${commentId}`,
      {
        content: content,
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

export async function fetchPostComments(postId) {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND}comments/getPostComments/${postId}`
    );
    if (data) {
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error.response;
  }
}

export async function fetchAllComments() {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND}comments/getcomments`
    );
    if (data) {
      return data.data.comments;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error.response;
  }
}

export async function fetchCommentLimit(nb) {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND}comments/getcomments?limit=${nb}`
    );
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response;
  }
}

export async function fetchPaginationComments(startIndex) {
  try {
    const data = await axios.get(
      `${
        import.meta.env.VITE_BACKEND
      }comments/getPostComments?startIndex=${startIndex}`
    );
    if (data) {
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error.response;
  }
}

export async function fetchLikeComment(commentId) {
  try {
    const data = await axios.put(
      `${import.meta.env.VITE_BACKEND}comments/likeComment/${commentId}`,
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

export async function fetchDeleteComment(commentId) {
  try {
    const data = await axios.delete(
      `${import.meta.env.VITE_BACKEND}comments/deleteComment/${commentId}`,
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

import {
  Alert,
  Button,
  Modal,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  fetchCreateComment,
  fetchDeleteComment,
  fetchLikeComment,
  fetchPostComments,
} from "../db/fetchComments";
import { toast } from "react-toastify";
// import { io } from "socket.io-client";
// const socket = io(`${import.meta.env.VITE_BACKEND}`, {
//   reconnection: true,
// });

export default function CommentSection({
  postId,
  socket,
  setNumber,
  number,
  userPost,
}) {
  const { currentUser } = useSelector((state) => state.user);

  // one comment content
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  // all comments
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    socket.on("new-comment", async (data) => {
      setComments(data);
      setNumber(data.length);
    });
    // socket.on("notification", (data) => {
    //   if (
    //     currentUser.username === userPost &&
    //     currentUser.username != data.user
    //   ) {
    //     console.log(`${data.user} ${data.message}`);
    //     // alert(`${data.user} ${data.message}`);
    //   }
    // });
  });
  useEffect(() => {
    socket.on("notification", (data) => {
      if (
        currentUser.username === userPost &&
        currentUser.username != data.user
      ) {
        // console.log(`${data.user} ${data.message}`);
        toast(`${data.user} ${data.message}`);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (comment.length > 200 || comment.length <= 0) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetchCreateComment(comment, postId, currentUser);
      if (res.status === 200) {
        setLoading(false);
        setComment("");
        setCommentError(null);
        setNumber(number + 1);
        setComments([res.data, ...comments]);
        socket.emit("comment", {
          comments: [res.data, ...comments],
          user: currentUser.username,
        });
      }
    } catch (error) {
      setLoading(false);
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetchPostComments(postId);
        if (res.status === 200) {
          setComments(res.data);
          setNumber(res.data.length);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
    return () => {
      socket.off("new-comment");
    };
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/auth");
        return;
      }
      const res = await fetchLikeComment(commentId);
      if (res.status === 200) {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: res.data.likes,
                  numberOfLikes: res.data.numberOfLikes,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (commentForUpdate, editedContent) => {
    setComments(
      comments.map((comment) =>
        comment._id === commentForUpdate._id
          ? { ...comment, content: editedContent }
          : comment
      )
    );
  };

  useEffect(() => {
    socket.on("delete-comment", (data) => {
      setComments(data[1]);
      setNumber(data[1].length);
    });
  });

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/auth");
        return;
      }
      const res = await fetchDeleteComment(commentId);
      if (res.status === 200) {
        setComments(comments.filter((comment) => comment._id !== commentId));
        setNumber(number - 1);
        socket.emit("comment", {
          comments: [
            res.data,
            comments.filter((comment) => comment._id !== commentId),
          ],
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={"/profile"}
            className=" text-customMediumBlue font-semibold text-md hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-customMediumBlue my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-customLightBlue hover:underline" to={"/auth"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-customMediumBlue rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button
              outline
              className="text-white bg-gradient-to-r from-customMediumBlue to-customGreenBlue"
              type="submit"
            >
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : !loading ? (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen mx-auto">
          <Spinner size="xl" />
        </div>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

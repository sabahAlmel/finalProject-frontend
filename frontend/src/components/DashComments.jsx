import { Modal, Table, Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  fetchAllComments,
  fetchDeleteComment,
  fetchPaginationComments,
} from "../db/fetchComments";
import { useQuery } from "react-query";
import { motion } from "framer-motion";

export default function DashComments({ isOpen, isMobile, setIsOpen }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  const { isLoading, data: commentRes } = useQuery(
    "comments",
    fetchAllComments,
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
  useEffect(() => {
    if (commentRes) {
      setComments(commentRes);
      if (commentRes?.length < 9) {
        setShowMore(false);
      }
    }
  }, [commentRes]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen mx-auto">
        <Spinner size="xl" />
      </div>
    );
  }

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetchPaginationComments(startIndex);
      if (res.status === 200) {
        setComments((prev) => [...prev, ...res.data.comments]);
        if (res.data.comments.length <= 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetchDeleteComment(commentIdToDelete);
      if (res.status === 200) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <motion.div
      className="table-auto overflow-x-scroll  mx-auto md:mx-2 lg:mx-10 w-full p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isMobile && (
        <Button
          outline
          className="md:hidden bg-gradient-to-r from-customMediumBlue to-customGreenBlue"
          onClick={() => setIsOpen(!isOpen)}
        >
          Open Sidebar
        </Button>
      )}
      <h1 className="font-bold text-customMediumBlue my-7 text-3xl">
        All comments
      </h1>
      {currentUser.role === "admin" && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body className="divide-y" key={comment._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="line-clamp-5">
                    {comment.content}
                  </Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId.title}</Table.Cell>
                  <Table.Cell>{comment.userId.username}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-customLightBlue self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no comments yet!</p>
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
              <Button color="failure" onClick={handleDeleteComment}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </motion.div>
  );
}

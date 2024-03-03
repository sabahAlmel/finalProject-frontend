import { Modal, Table, Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  fetchDeletePost,
  fetchPostsPagination,
  fetchPostsWithoutPagination,
} from "../db/fetchPost.js";
import { useQuery } from "react-query";
import { motion } from "framer-motion";

export default function DashPosts({ isOpen, isMobile, setIsOpen }) {
  const [userPosts, setUserPosts] = useState();
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const {
    isLoading,
    data: postRes,
    error: postsError,
    refetch,
  } = useQuery("posts", fetchPostsWithoutPagination, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  useEffect(() => {
    if (postRes) {
      setUserPosts(postRes);
      if (postRes?.length < 9) {
        setShowMore(false);
      }
    }
  }, [postRes]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetchPostsPagination(startIndex);
      if (res.status === 200) {
        setUserPosts((prev) => [...prev, ...res.data.posts]);
        if (res.data.posts.length <= 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const res = await fetchDeletePost(id);
      if (res.status !== 200) {
        return;
      } else {
        setUserPosts((prev) => prev.filter((post) => post._id !== id));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen mx-auto">
        <Spinner size="xl" />
      </div>
    );
  }

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
        All Posts
      </h1>
      {userPosts &&
        (userPosts.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
                <Table.HeadCell>Post image</Table.HeadCell>
                <Table.HeadCell>Post title</Table.HeadCell>
                <Table.HeadCell>Range</Table.HeadCell>
                <Table.HeadCell>Type</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {userPosts.map((post) => (
                <Table.Body key={post._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-20 h-10 object-cover bg-gray-500"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-gray-900 dark:text-white line-clamp-4"
                        to={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{post.categoryId?.range}</Table.Cell>
                    <Table.Cell>{post.subCategoryId?.name}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
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
          <p>You have no posts yet!</p>
        ))}
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
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDeletePost(postIdToDelete)}
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
    </motion.div>
  );
}

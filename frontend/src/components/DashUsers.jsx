import { Modal, Table, Button, Spinner, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useQuery } from "react-query";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  fetchDeleteUser,
  fetchUpdateUser,
  fetchUsersPagination,
  fetchUsersWithoutPagination,
} from "../db/fetchUser.js";

export default function DashUsers({ isOpen, isMobile, setIsOpen }) {
  const [user, setUser] = useState();
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const {
    isLoading,
    data: userRes,
    error: userError,
    refetch,
  } = useQuery("users", fetchUsersWithoutPagination, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  useEffect(() => {
    if (userRes) {
      setUser(userRes);
      if (userRes?.length < 9) {
        setShowMore(false);
      }
    }
  }, [userRes]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen mx-auto">
        <Spinner size="xl" />
      </div>
    );
  }

  const handleShowMore = async () => {
    const startIndex = user.length;
    try {
      const res = await fetchUsersPagination(startIndex);
      if (res.status === 200) {
        setUser((prev) => [...prev, ...data.users]);
        if (res.data.users.length <= 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await fetchDeleteUser(id);
      if (res.status !== 200) {
        return;
      } else {
        setUser((prev) => prev.filter((user) => user._id !== id));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = async (value, role, id) => {
    const res = await fetchUpdateUser(id, { role: value });
    if (res.status === 200) {
      refetch;
      setUser((prev) => prev.map((user) => (user._id == id ? res.data : user)));
    }
  };

  return (
    <div className="table-auto w-full overflow-x-scroll mx-auto md:mx-2 lg:mx-10 p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
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
        All Users
      </h1>
      {user &&
        (user.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date created</Table.HeadCell>
                <Table.HeadCell>User image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {user.map((user) => (
                <Table.Body className="divide-y" key={user._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      <Select
                        style={{
                          cursor: "pointer",
                          color: user.role === "admin" ? "#3498db" : "#e74c3c",
                        }}
                        onChange={(e) =>
                          handleChange(e.target.value, user.role, user._id)
                        }
                        value={user.role}
                      >
                        <option value="admin" className="text-white">
                          Admin
                        </option>
                        <option value="user" className="text-white">
                          User
                        </option>
                      </Select>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
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
          <p>You have no users yet!</p>
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
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDeleteUser(userIdToDelete)}
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

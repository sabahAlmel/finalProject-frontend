import { Modal, Table, Button, TextInput, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useQuery } from "react-query";
import {
  fetchCategories,
  fetchCreateCategory,
  fetchDeleteCategory,
  fetchUpdateCategory,
} from "../db/fetchCategory";
export default function DashCategories({ isOpen, isMobile, setIsOpen }) {
  const [categories, setCategories] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = useState("");
  const [categoryIdToDelete, setCategoryIdToDelete] = useState("");
  const [formData, setFormData] = useState({});

  const {
    isLoading,
    data: categoriesRes,
    error: categoriesError,
    refetch,
  } = useQuery("categories", fetchCategories, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  useEffect(() => {
    if (categoriesRes) {
      setCategories(categoriesRes);
    }
  }, [categoriesRes]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen mx-auto">
        <Spinner size="xl" />
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryDelete = async (id) => {
    try {
      const res = await fetchDeleteCategory(id);
      if (res.status !== 200) {
        return;
      } else {
        setCategories((prev) => prev.filter((category) => category._id !== id));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCategoryUpdate = async (id) => {
    try {
      const res = await fetchUpdateCategory(id, formData);
      if (res.status !== 200) {
        return;
      } else {
        await refetch();
        setShowEditModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCategoryCreate = async () => {
    try {
      const res = await fetchCreateCategory(formData);
      if (res.status !== 200) {
        return;
      } else {
        await refetch();
        setShowEditModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto p-3 ">
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
        All Categories
      </h1>
      <Button
        className="bg-customMediumBlue mb-10"
        onClick={() => {
          setShowEditModal(true);
          setCategoryToUpdate("");
        }}
      >
        Add a Category
      </Button>
      {categories &&
        (categories.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date created</Table.HeadCell>
                <Table.HeadCell>Range</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              {categories.map((category) => (
                <Table.Body className="divide-y" key={category._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(category.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{category.range}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setCategoryIdToDelete(category._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        className="text-customLightBlue hover:underline"
                        onClick={() => {
                          setShowEditModal(true);
                          setCategoryToUpdate(category);
                        }}
                      >
                        <span>Edit</span>
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </>
        ) : (
          <p>You have no categories yet!</p>
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
              Are you sure you want to delete this category?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleCategoryDelete(categoryIdToDelete)}
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
      <Modal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <TextInput
              type="text"
              id="range"
              name="name"
              placeholder="enter a range"
              defaultValue={categoryToUpdate.range}
              onChange={handleChange}
            />
            <div className="flex justify-center gap-4 mt-6">
              {categoryToUpdate !== "" ? (
                <Button
                  className="bg-customMediumBlue border-none"
                  onClick={() => {
                    handleCategoryUpdate(categoryToUpdate._id);
                  }}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  className="bg-customMediumBlue border-none"
                  onClick={handleCategoryCreate}
                >
                  Add
                </Button>
              )}
              <Button color="gray" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

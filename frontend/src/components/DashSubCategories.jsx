import { Modal, Table, Button, TextInput, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useQuery } from "react-query";
import {
  fetchSubCategories,
  fetchCreateSubCategory,
  fetchUpdateSubCategory,
  fetchDeleteSubCategory,
} from "../db/fetchSubCategory";
export default function DashSubCategories() {
  const [subCategories, setSubCategories] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [subCategoryToUpdate, setSubCategoryToUpdate] = useState("");
  const [subCategoryIdToDelete, setSubCategoryIdToDelete] = useState("");
  const [formData, setFormData] = useState({});

  const {
    isLoading,
    data: subCategoriesRes,
    error: subCategoriesError,
    refetch,
  } = useQuery("subCategories", fetchSubCategories, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  useEffect(() => {
    if (subCategoriesRes) {
      setSubCategories(subCategoriesRes);
    }
  }, [subCategoriesRes]);

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

  const handleSubCategoryDelete = async (id) => {
    try {
      const res = await fetchDeleteSubCategory(id);
      if (res.status !== 200) {
        return;
      } else {
        setSubCategories((prev) =>
          prev.filter((subCategories) => subCategories._id !== id)
        );
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubCategoryUpdate = async (id) => {
    try {
      const res = await fetchUpdateSubCategory(id, formData);
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

  const handleSubCategoryCreate = async () => {
    try {
      const res = await fetchCreateSubCategory(formData);
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
    <div className="table-auto  p-3 ">
      <h1 className="font-bold text-customMediumBlue my-7 text-3xl">
        All SubCategories
      </h1>
      <Button
        className="bg-customMediumBlue mb-10"
        onClick={() => {
          setShowEditModal(true);
          setSubCategoryToUpdate("");
        }}
      >
        Add a SubCategory
      </Button>
      {subCategories &&
        (subCategories.length > 0 ? (
          <>
            <Table hoverable className="shadow-md min-h-72">
              <Table.Head>
                <Table.HeadCell>Date created</Table.HeadCell>
                <Table.HeadCell>type</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              {subCategories.map((subCategory) => (
                <Table.Body className="divide-y" key={subCategory._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(subCategory.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{subCategory.name}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setSubCategoryIdToDelete(subCategory._id);
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
                          setSubCategoryToUpdate(subCategory);
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
          <p>You have no subCategories yet!</p>
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
              Are you sure you want to delete this subCategory?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleSubCategoryDelete(subCategoryIdToDelete)}
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
              id="name"
              name="name"
              placeholder="enter a type"
              defaultValue={subCategoryToUpdate.name}
              onChange={handleChange}
            />
            <div className="flex justify-center gap-4 mt-6">
              {subCategoryToUpdate !== "" ? (
                <Button
                  className="bg-customMediumBlue border-none"
                  onClick={() => {
                    handleSubCategoryUpdate(subCategoryToUpdate._id);
                  }}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  className="bg-customMediumBlue border-none"
                  onClick={handleSubCategoryCreate}
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

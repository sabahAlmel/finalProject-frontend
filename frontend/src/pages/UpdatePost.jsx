import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategories } from "../db/fetchCategory";
import { fetchSubCategories } from "../db/fetchSubCategory";
import { useQuery } from "react-query";
import {
  fetchCreatePost,
  fetchPostsWithPostId,
  fetchUpdatePost,
} from "../db/fetchPost";
import icon from "../assets/icons/family.png";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [addError, setAddError] = useState(null);

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetchPostsWithPostId(postId);
        if (res.status !== 200) {
          setAddError(res.data.message);
          return;
        }
        if (res.status === 200) {
          setAddError(null);
          setFormData(res.data.posts[0]);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const { isLoading: isLoadingSub, data: subCategories } = useQuery(
    "subCategory",
    fetchSubCategories,
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
  const { isLoading: isLoadingCateg, data: categories } = useQuery(
    "category",
    fetchCategories,
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchUpdatePost(formData._id, formData);
      if (res.status !== 200) {
        setAddError(res.data.message);
        return;
      }

      if (res.status === 200) {
        setAddError(null);
        navigate(`/post/${res.data.slug}`);
      }
    } catch (error) {
      setAddError("Something went wrong");
    }
  };
  return (
    <motion.div
      className="p-3 max-w-3xl mx-auto my-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Update an Article</title>
        <link rel="shortcut icon" href={icon} type="image/x-icon" />
      </Helmet>
      <h1 className="text-center mb-10 text-3xl font-semibold">
        Update an Article
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            value={formData?.categoryId?._id}
          >
            <option value="">Select a Range</option>
            {categories?.map((category, index) => (
              <option key={index} value={category._id}>
                {category.range}
              </option>
            ))}
          </Select>
          <Select
            onChange={(e) =>
              setFormData({ ...formData, subCategoryId: e.target.value })
            }
            value={formData?.subCategoryId?._id}
          >
            <option value="">Select a Type</option>
            {subCategories?.map((subCategory, index) => (
              <option key={index} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between ">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            className=" bg-gradient-to-r from-customMediumBlue to-customGreenBlue"
            size="sm"
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          value={formData.description}
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, description: value });
          }}
        />
        <Button
          type="submit"
          className=" bg-gradient-to-r from-customPink to-customGreenBlue hover:from-customGreenBlue hover:to-customPink"
          disabled={imageUploadProgress}
        >
          Update
        </Button>
        {addError && (
          <Alert className="mt-5" color="failure">
            {addError}
          </Alert>
        )}
      </form>
    </motion.div>
  );
}

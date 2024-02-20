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
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../db/fetchCategory";
import { fetchSubCategories } from "../db/fetchSubCategory";
import { useQuery } from "react-query";
import { fetchCreatePost } from "../db/fetchPost";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [addError, setAddError] = useState(null);

  const navigate = useNavigate();

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
      const res = await fetchCreatePost(formData);
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
    <div className="p-3 max-w-3xl mx-auto my-32">
      <h1 className="text-center mb-10 text-3xl font-semibold">
        Create a post
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
          />
          <Select
            style={{ cursor: "pointer" }}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select a Range</option>
            {categories?.map((category, index) => (
              <option key={index} value={category._id}>
                {category.range}
              </option>
            ))}
          </Select>
          <Select
            style={{ cursor: "pointer" }}
            onChange={(e) =>
              setFormData({ ...formData, subCategory: e.target.value })
            }
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
            className=" bg-gradient-to-r from-customMediumBlue to-customGreenBlue "
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
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, description: value });
          }}
        />
        <Button
          type="submit"
          className=" bg-gradient-to-r from-customPink to-customGreenBlue hover:from-customGreenBlue hover:to-customPink  "
          disabled={imageUploadProgress}
        >
          Add
        </Button>
        {addError && (
          <Alert className="mt-5" color="failure">
            {addError}
          </Alert>
        )}
      </form>
    </div>
  );
}

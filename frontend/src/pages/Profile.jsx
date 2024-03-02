import {
  Alert,
  Button,
  Modal,
  ModalBody,
  TextInput,
  Spinner,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { fetchDeleteUser, fetchUpdateUser } from "../db/fetchUser";
import { signIn, signout } from "../redux/user/userSlice";
import { HiOutlineExclamationCircle, HiPencil, HiTrash } from "react-icons/hi";
import { PiEyeClosedLight } from "react-icons/pi";
import { PiEye } from "react-icons/pi";
import { fetchDeletePost, fetchUserPosts } from "../db/fetchPost";
import { useQuery } from "react-query";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPostsError, setShowPostsError] = useState();
  const [posts, setPosts] = useState();
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [postId, setPostId] = useState();
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserSuccess(null);
    setUpdateUserError(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      const res = await fetchUpdateUser(currentUser._id, formData);
      if (res.status !== 200) {
        setUpdateUserError(res.data.message);
      } else {
        dispatch(signIn(res.data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetchDeleteUser(currentUser._id);
      if (res.status !== 200) {
        setUpdateUserError(res.data.message);
      } else {
        localStorage.removeItem("token");
        dispatch(signout());
        navigate("/");
      }
    } catch (error) {
      setUpdateUserError(error.message);
    }
  };
  const handleSignout = () => {
    localStorage.removeItem("token");
    dispatch(signout());
    navigate("/");
  };

  const handleShow = () => {
    setOpen(!open);
  };

  const {
    isLoading,
    data: postRes,
    error: postsError,
    refetch,
  } = useQuery(
    ["posts", currentUser._id],
    () => fetchUserPosts(currentUser._id),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
  useEffect(() => {
    setPosts(postRes?.data || []);
  }, [postRes]);
  const handleShowPosts = async () => {
    setPosts(postRes?.data || []);
    if (postsError) {
      setShowPostsError(postsError);
    }
    if (postRes?.status === 200) {
      setShowPostsError();
      return;
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const res = await fetchDeletePost(id);
      if (res.status !== 200) {
        return;
      }
      refetch();
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      setDeletePostModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) {
    <div className="flex justify-center items-center min-h-screen">
      <Spinner size="xl" />
    </div>;
  }

  return (
    <section className="flex justify-around flex-col lg:flex-row  w-full mx-auto my-16 p-3">
      <div
        className={`  ${
          posts && posts.length > 0 ? "lg:w-[50%] lg:mr-5 w-full" : "w-full"
        } `}
      >
        <h1 className=" text-center mb-4 font-semibold text-3xl">Profile</h1>
        <form
          className="flex w-[90%] md:w-[60%]  mx-auto flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          <div
            className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(74 ,94 ,163, ${
                      imageFileUploadProgress / 100
                    })`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentUser.profilePicture}
              alt="user"
              className={`rounded-full w-full h-full object-cover border-8 border-customGreenBlue ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                "opacity-60"
              }`}
            />
          </div>
          {imageFileUploadError && (
            <Alert color="failure">{imageFileUploadError}</Alert>
          )}
          <TextInput
            type="text"
            id="username"
            name="username"
            placeholder="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <TextInput
            type="email"
            id="email"
            name="email"
            placeholder="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <div className="relative">
            <TextInput
              type={open ? "text" : "password"}
              id="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            {open ? (
              <PiEyeClosedLight
                className="absolute top-3 right-6"
                onClick={handleShow}
              />
            ) : (
              <PiEye className="absolute top-3 right-6" onClick={handleShow} />
            )}
          </div>
          <Button
            type="submit"
            className="bg-gradient-to-r from-customMediumBlue to-customGreenBlue  rounded-md"
            outline
          >
            update
          </Button>
          <Link to={"/createpost"}>
            <Button
              type="button"
              className=" bg-gradient-to-r from-customPink to-customGreenBlue hover:to-customPink hover:from-customGreenBlue w-full"
            >
              Create a post
            </Button>
          </Link>
        </form>
        <div className="text-red-500 w-[90%] md:w-[60%] mx-auto flex justify-between mt-5">
          <span className="cursor-pointer" onClick={() => setShowModal(true)}>
            Delete Account
          </span>
          <span className="cursor-pointer" onClick={handleSignout}>
            Sign Out
          </span>
        </div>
        {updateUserSuccess && (
          <Alert color="success" className="mt-5">
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserError && (
          <Alert color="failure" className="mt-5">
            {updateUserError}
          </Alert>
        )}
      </div>

      {/* <button
        onClick={handleShowPosts}
        className="text-customMediumBlue mt-10 w-full"
      >
        Show Posts
      </button> */}
      {showPostsError && (
        <Alert color="failure" className="mt-5">
          {showPostsError}
        </Alert>
      )}
      {posts &&
        (posts.length > 0 ? (
          <div className="flex scrollProfile overflow-y-auto max-h-[70vh] mx-auto lg:w-[50%] md:w-[60%] w-[90%] mt-20 lg:mt-0 flex-col gap-4">
            <h1 className=" text-center mb-4 font-semibold text-3xl">
              Your Articles
            </h1>
            <div className="w-full md:w-[95%] flex flex-col gap-8 lg:mr-8 mx-auto">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="border mx-auto rounded-lg p-3 w-full flex items-center gap-4"
                >
                  <Link to={`/post/${post.slug}`} className="w-[15%]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-16 w-16 object-contain"
                    />
                  </Link>
                  <div className="flex w-[80%] justify-center">
                    <div className="flex  flex-col gap-1 w-[85%]">
                      <div className="flex justify-between gap-8">
                        <Link
                          className="text-slate-700 dark:text-white font-semibold  hover:underline truncate line-clamp-1 flex-1"
                          to={`/post/${post.slug}`}
                        >
                          <p>{post.title}</p>
                        </Link>
                        <div>
                          <p>{post?.categoryId?.range}</p>
                        </div>
                        <div>
                          <p>{post?.subCategoryId?.name}</p>
                        </div>
                      </div>
                      <div
                        className=" mx-auto w-full line-clamp-1"
                        dangerouslySetInnerHTML={{
                          __html: post && post.description,
                        }}
                      ></div>
                    </div>

                    <div className="flex sm:gap-3 sm:flex-row flex-col w-[15%] items-center ml-5 justify-center">
                      <button
                        onClick={() => {
                          setPostId(post._id);
                          setDeletePostModal(true);
                        }}
                        className="text-red-700 uppercase hover:underline"
                      >
                        <HiTrash size={30} />
                      </button>
                      <Link to={`/update-post/${post._id}`}>
                        <button className="text-customLightBlue uppercase hover:underline">
                          <HiPencil size={30} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full mt-20 md:mt-4 flex justify-center items-center text-4xl ">
            No articles Yet.
          </div>
        ))}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="lg"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteAccount}>
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
        show={deletePostModal}
        onClose={() => setDeletePostModal(false)}
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
              <Button color="failure" onClick={() => handleDeletePost(postId)}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setDeletePostModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

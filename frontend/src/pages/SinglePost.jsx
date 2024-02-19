import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchPostLimit,
  fetchPostSlug,
  fetchRecommendPost,
} from "../db/fetchPost";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { FaHeart, FaRegComment, FaRegHeart, FaVolumeUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function SinglePost() {
  const { currentUser } = useSelector((state) => state.user);
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [scrolled, setScrolled] = useState(true);
  const [heartClicked, setHeartClicked] = useState(false);
  const [volumeClicked, setVolumeClicked] = useState(false);
  const [hover, setHover] = useState(false);
  const [numberComments, setNumberComments] = useState(0);
  const [speech, setSpeech] = useState(false);

  useEffect(() => {
    setSpeech("speechSynthesis" in window);
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 100) {
  //       console.log("hii");
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetchPostLimit(3);
        if (res.status === 200) {
          setRecentPosts(res.data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetchPostSlug(postSlug);
        if (res.status !== 200) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.status === 200) {
          setPost(res.data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  const handleHeartClick = (postId) => {
    handleRecommendation(postId);
    setHeartClicked(true);
  };
  const handleVolumeClick = () => {
    setVolumeClicked(!volumeClicked);
    if (speech && !volumeClicked) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = post.title + ". " + post.description;
      utterance.onend = () => {
        setVolumeClicked(false);
      };
      speechSynthesis.speak(utterance);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  const handleRecommendation = async (postId) => {
    try {
      if (!currentUser) {
        navigate("/auth");
        return;
      }
      const res = await fetchRecommendPost(postId);
      if (res.status === 200) {
        setPost({
          ...post,
          people: res.data.people,
          nbOfRecommendation: res.data.nbOfRecommendation,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <div className="flex mx-auto w-40 justify-between">
        <Link
          to={`/search?category=${post && post.categoryId._id}`}
          className="self-center mt-5"
        >
          <Button color="gray" pill size="xs">
            {post && post.categoryId.range}
          </Button>
        </Link>
        <Link
          to={`/search?subcategory=${post && post.subCategoryId._id}`}
          className="self-center mt-5"
        >
          <Button color="gray" pill size="xs">
            {post && post.subCategoryId.name}
          </Button>
        </Link>
      </div>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-7 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-4 border-b border-slate-500 mx-auto w-full max-w-2xl text-md ">
        <div className="flex gap-3">
          <img
            className="h-14 w-14 object-cover rounded-full"
            src={post && post.userId.profilePicture}
          />
          <div className=" self-center">
            <div className="mb-2">
              Posted by{" "}
              <span className="font-bold">{post && post.userId.username} </span>
            </div>
            <span className="text-gray-500">
              {post && new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <span className="italic self-center">
          {post && (post.description.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.description }}
      ></div>
      <CommentSection
        postId={post._id}
        setNumber={setNumberComments}
        number={numberComments}
      />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
      {scrolled && (
        <div className="w-full flex  justify-center">
          <div className="fixed flex justify-between items-center bottom-10 w-44 p-4 dark:bg-customDarkBlue bg-white rounded-full floatShadow">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => handleHeartClick(post._id)}
                className={`text-gray-400 hover:text-red-500 ${
                  currentUser &&
                  post.people.includes(currentUser._id) &&
                  "!text-red-500"
                }`}
              >
                {hover ||
                (currentUser && post.people.includes(currentUser._id)) ? (
                  <FaHeart className="text-lg" />
                ) : (
                  <FaRegHeart className="text-lg" />
                )}
              </button>
              <span>{post.nbOfRecommendation}</span>
            </div>
            <div className="flex items-center gap-3">
              <span type="button" className={`text-gray-400`}>
                <FaRegComment className="text-lg" />
              </span>
              <span>{numberComments}</span>
            </div>
            <button
              type="button"
              onClick={handleVolumeClick}
              className={` hover:text-customDarkBlue hover:dark:text-white ${
                volumeClicked
                  ? "text-customDarkBlue dark:text-white"
                  : "text-gray-400"
              }`}
            >
              <FaVolumeUp className="text-lg" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

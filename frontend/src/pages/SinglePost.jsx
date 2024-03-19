import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPostSlug,
  fetchRecommendPost,
  fetchRecommendPostByCategory,
} from "../db/fetchPost";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { FaHeart, FaRegComment, FaRegHeart, FaVolumeUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import icon from "../assets/icons/family.png";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import SinglePostSkeleton from "../components/SinglePostSkeleton";

export default function SinglePost({ socket }) {
  const { currentUser } = useSelector((state) => state.user);
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState(null);
  const [scrolled, setScrolled] = useState(true);
  const [heartClicked, setHeartClicked] = useState(false);
  const [volumeClicked, setVolumeClicked] = useState(false);
  const [hover, setHover] = useState(false);
  const [numberComments, setNumberComments] = useState(0);
  const [speech, setSpeech] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setSpeech("speechSynthesis" in window);
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
          getRelated(res.data.posts[0].categoryId._id);
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

  function getRelated(categoryId) {
    try {
      const fetchRelatedPosts = async () => {
        const res = await fetchRecommendPostByCategory(categoryId, 3);
        if (res.status === 200) {
          setRelatedPosts(res.data);
        }
      };
      fetchRelatedPosts();
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleHeartClick = (postId) => {
    handleRecommendation(postId);
    setHeartClicked(true);
  };
  const handleVolumeClick = () => {
    if (volumeClicked) {
      if (speech && speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    } else {
      if (speech) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = post.title + ". " + post.description;
        utterance.onend = () => {
          setVolumeClicked(false);
        };
        speechSynthesis.speak(utterance);
      }
    }
    setVolumeClicked(!volumeClicked);
  };

  if (loading) return <SinglePostSkeleton />;

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Single Article</title>
        <link rel="shortcut icon" href={icon} type="image/x-icon" />
      </Helmet>
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {post && post.title}
        </h1>
        <img
          src={post && post.image}
          alt={post && post.title}
          draggable={false}
          className="mt-7 p-3 max-h-[600px] w-full object-cover"
        />
        <div className="flex justify-between p-4 border-b border-slate-500 mx-auto w-full  text-md ">
          <div className="flex gap-3">
            <img
              className="h-14 w-14 object-cover rounded-full"
              src={post && post.userId.profilePicture}
              draggable={false}
            />
            <div className=" self-center">
              <div className="mb-2">
                Posted by{" "}
                <span className="font-bold">
                  {post && post.userId.username}{" "}
                </span>
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
          className="p-3 mx-auto w-full post-content"
          dangerouslySetInnerHTML={{ __html: post && post.description }}
        ></div>
        <CommentSection
          socket={socket}
          userPost={post.userId.username}
          postId={post._id}
          setNumber={setNumberComments}
          number={numberComments}
        />

        {scrolled && (
          <div className="w-full flex  justify-center z-20">
            <div className="fixed flex justify-between items-center bottom-10 w-44 p-4  bg-customMediumBlue rounded-full floatShadow">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  onClick={() => handleHeartClick(post._id)}
                  className={`text-white hover:text-red-700 ${
                    currentUser &&
                    post.people.includes(currentUser._id) &&
                    "!text-red-700"
                  }`}
                >
                  {hover ||
                  (currentUser && post.people.includes(currentUser._id)) ? (
                    <FaHeart className="text-lg" />
                  ) : (
                    <FaRegHeart className="text-lg" />
                  )}
                </button>
                <span className="text-white">{post.nbOfRecommendation}</span>
              </div>
              <div className="flex items-center gap-3">
                <span type="button" className={`text-white`}>
                  <FaRegComment className="text-lg" />
                </span>
                <span className="text-white">{numberComments}</span>
              </div>
              <button
                type="button"
                onClick={handleVolumeClick}
                className={` hover:text-customDarkBlue  ${
                  volumeClicked ? "text-customDarkBlue" : "text-white"
                }`}
              >
                <FaVolumeUp className="text-lg" />
              </button>
            </div>
          </div>
        )}
      </main>
      <div className="flex flex-col w-full justify-center items-center mb-10">
        <h1 className="text-3xl mt-5">Related Articles</h1>
        <div className="flex flex-wrap  mt-10 justify-center">
          {relatedPosts ? (
            relatedPosts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <h1> No Related Articles</h1>
          )}
        </div>
      </div>
    </motion.div>
  );
}

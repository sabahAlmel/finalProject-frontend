import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { fetchSearchPost } from "../db/fetchPost";
import { fetchCategories } from "../db/fetchCategory";
import { fetchSubCategories } from "../db/fetchSubCategory";
import { useQuery } from "react-query";
import { HiChevronDoubleUp } from "react-icons/hi";
import icon from "../assets/icons/family.png";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Skeleton from "../components/Skeleton";

export default function Search() {
  const [formData, setFormData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
    subCategory: "",
  });
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState(false);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(isMobile ? false : true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const location = useLocation();

  const navigate = useNavigate();

  const fetchPosts = async (urlParams) => {
    setLoading(true);
    const searchQuery = urlParams.toString();
    console.log(searchQuery);
    const res = await fetchSearchPost(searchQuery);
    if (res.status !== 200) {
      setLoading(false);
      return;
    }
    if (res.status === 200) {
      setPosts(res.data.posts);
      setLoading(false);
      if (res.data.posts.length === 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    const subCategoryFromUrl = urlParams.get("subcategory");
    if (
      searchTermFromUrl ||
      sortFromUrl ||
      categoryFromUrl ||
      subCategoryFromUrl
    ) {
      setFormData({
        ...formData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
        subCategory: subCategoryFromUrl,
      });
    }
    fetchPosts(urlParams);
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setFormData({ ...formData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setFormData({ ...formData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "";
      setFormData({ ...formData, category });
    }
    if (e.target.id === "subcategory") {
      const subCategory = e.target.value || "";
      setFormData({ ...formData, subCategory });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = (e) => {
    setStatus(true);
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", formData.searchTerm);
    urlParams.set("sort", formData.sort);
    urlParams.set("category", formData.category);
    urlParams.set("subcategory", formData.subCategory);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const resetFilters = (e) => {
    navigate(`/search`);
    setStatus(false);
  };

  useEffect(() => {}, []);

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetchSearchPost(searchQuery);
    if (res.status !== 200) {
      return;
    }
    if (res.status === 200) {
      setPosts([...posts, ...res.data.posts]);
      if (res.data.posts.length <= 8) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }
    }
  };

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

  return (
    <motion.div
      className="flex flex-col md:flex-row "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Search</title>
        <link rel="shortcut icon" href={icon} type="image/x-icon" />
      </Helmet>
      <div
        className="p-9 md:min-h-screen shadow-2xl dark:bg-customDarkBlue bg-white dark:shadow-slate-700 searchSide w-full fixed top-0 z-20 md:w-56 md:relative transition-all duration-1000"
        style={{
          top: isOpen ? "0 " : "-1000px",
          width: isOpen ? (isMobile ? "100%" : "21rem") : "0",
        }}
      >
        {isMobile && (
          <div
            className="w-full flex justify-end text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            x
          </div>
        )}
        <form
          className="flex flex-col gap-8 sticky top-[50px]"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-2 ">
            <label className="whitespace-nowrap w-14 font-semibold">
              Search:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              className="w-52 md:w-40 "
              value={formData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2 ">
            <label className="font-semibold w-14">Sort:</label>
            <Select
              style={{ cursor: "pointer" }}
              onChange={handleChange}
              value={formData.sort}
              className="w-52 md:w-40 "
              id="sort"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold w-14">Range:</label>
            <Select
              style={{ cursor: "pointer" }}
              onChange={handleChange}
              value={formData.category}
              className="w-52 md:w-40 "
              id="category"
            >
              <option value="">Select a Range</option>
              {categories?.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.range}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold w-14">Type:</label>
            <Select
              style={{ cursor: "pointer" }}
              onChange={handleChange}
              value={formData.subCategory}
              className="w-52 md:w-40 "
              id="subcategory"
            >
              <option value="">Select a Type</option>
              {subCategories?.map((subCategory, index) => (
                <option key={index} value={subCategory._id}>
                  {subCategory.name}
                </option>
              ))}
            </Select>
          </div>
          <Button
            type="submit"
            outline
            className=" bg-gradient-to-r from-customMediumBlue to-customGreenBlue"
          >
            Apply Filters
          </Button>
          <Button
            className=" bg-gradient-to-r from-customPink to-customGreenBlue hover:from-customGreenBlue hover:to-customPink"
            onClick={resetFilters}
          >
            Remove Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        {isMobile && (
          <Button
            outline
            className="md:hidden bg-gradient-to-r from-customMediumBlue to-customGreenBlue mt-5 mx-7 "
            onClick={() => setIsOpen(!isOpen)}
          >
            Search
          </Button>
        )}
        <h1 className="text-3xl font-semibold sm:border-b dark:border-gray-700 p-3 mt-5 mx-4 ">
          {status
            ? ` Articles results for '${formData.searchTerm}':`
            : "All Articles: "}
        </h1>

        <div className="py-7 flex flex-wrap px-3 gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No articles found.</p>
          )}
          {loading && [...Array(8)].map((_, index) => <Skeleton key={index} />)}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && !loading && (
            <button
              onClick={handleShowMore}
              className="text-customMediumBlue text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
      {scrolled && (
        <div className="scroll" onClick={scrollToTop}>
          <HiChevronDoubleUp />
        </div>
      )}
    </motion.div>
  );
}

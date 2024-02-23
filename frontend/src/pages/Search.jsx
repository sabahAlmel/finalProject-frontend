import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { fetchSearchPost } from "../db/fetchPost";
import { fetchCategories } from "../db/fetchCategory";
import { fetchSubCategories } from "../db/fetchSubCategory";
import { useQuery } from "react-query";

export default function Search() {
  const [formData, setFormData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
    subCategory: "",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const fetchPosts = async (urlParams) => {
    setLoading(true);
    const searchQuery = urlParams.toString();
    const res = await fetchSearchPost(searchQuery);
    if (res.status !== 200) {
      setLoading(false);
      return;
    }
    if (res.status === 200) {
      setPosts(res.data.posts);
      setLoading(false);
      if (res.data.posts.length === 9) {
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

  const handleSubmit = (e) => {
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
  };

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
      if (res.data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
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
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex   items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={formData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select onChange={handleChange} value={formData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Range:</label>
            <Select
              style={{ cursor: "pointer" }}
              onChange={handleChange}
              value={formData.category}
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
            <label className="font-semibold">Type:</label>
            <Select
              style={{ cursor: "pointer" }}
              onChange={handleChange}
              value={formData.subCategory}
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
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
          Posts results:
        </h1>
        <div className="py-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-customMediumBlue text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function PostCard({ post, home }) {
  return (
    <div
      className={`${
        home ? "w-[90%] mx-auto sm:w-[95%]" : "w-[85%] sm:w-[350px]"
      } group relative mx-4 border border-customMediumBlue hover:border-2 h-[350px] overflow-hidden rounded-lg transition-all mb-6`}
    >
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-1">{post.title}</p>
        <div className="flex justify-between">
          <span className="italic text-sm">{post.categoryId?.range}</span>
          <span className="italic text-sm">{post.subCategoryId?.name}</span>
        </div>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute mx-4 bottom-[-200px] left-0 right-0 border border-customMediumBlue text-customMediumBlue hover:bg-customMediumBlue hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}

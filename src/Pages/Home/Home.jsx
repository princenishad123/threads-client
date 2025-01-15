import React, { useEffect } from "react";
import PostComponent from "../../components/PostComponents/PostComponent";
import { useGetPostsQuery } from "../../rtkQuery/postQuery";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../redux/postSlice";
import PostSkeleton from "../../components/PostSkeleton";

const Home = () => {
  const { data, isLoading } = useGetPostsQuery();

  const { posts } = useSelector((state) => state.postSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPosts(data));
  }, [data, setPosts, posts]);

  return (
    <div>
      {isLoading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}
      <div className="  ">
        {posts?.map((post, index) => (
          <PostComponent
            key={index}
            postId={post._id}
            author={post.author}
            likeCount={post.likeCount}
            caption={post.caption}
            commentCount={post.commentCount}
            shareCount={post.shareCount}
            image={post.image}
            authorDetails={post.authorDetails}
            likedBy={post.likedBy}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

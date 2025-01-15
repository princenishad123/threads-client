import React from "react";
import PostedPosts from "../../components/ProfileComponents/PostedPosts";
import { useSelector } from "react-redux";
import { useGetAutherPostsQuery } from "../../rtkQuery/postQuery";
import PostComponent from "../../components/PostComponents/PostComponent";

const Posts = () => {
  const { authUser } = useSelector((state) => state.authSlice);

  const { data: posts, isLoading } = useGetAutherPostsQuery({
    id: authUser._id,
  });
  return (
    <div>
      {posts ? (
        <>
          {posts?.map((post) => (
            <div key={post._id}>
              <PostComponent
                author={post.author}
                caption={post.caption}
                image={post.image}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                authorDetails={authUser}
                postId={post._id}
              />
            </div>
          ))}
        </>
      ) : (
        "no posts"
      )}
    </div>
  );
};

export default Posts;

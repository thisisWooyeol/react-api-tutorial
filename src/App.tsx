import './App.css';

import { useEffect, useState } from 'react';

import { PostDetail } from './PostDetail';
import { PostList } from './PostList';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const baseUrl = 'https://jsonplaceholder.typicode.com';

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${baseUrl}/posts`);
  const data = (await response.json()) as Post[];
  return data;
};

export const App = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [selectedPostId, setSelectedPost] = useState(1);

  /* fetchPosts */
  useEffect(() => {
    let ignore = false;
    fetchPosts()
      .then((data) => {
        if (!ignore) setPosts(data);
      })
      .catch((error: unknown) => {
        console.error(error);
        window.alert('데이터를 가져오지 못했습니다');
      });
    return () => {
      ignore = true;
    };
  }, []);

  /* handle post selection */
  const onPostClickBuilder = (postId: number) => () => {
    console.debug(`Post clicked: ${postId}`);
    setSelectedPost(postId);
  };

  return (
    <div className="max-w-screen-lg">
      {posts != null && (
        <div className="grid grid-flow-col m-8">
          <PostList posts={posts} onPostClickBuilder={onPostClickBuilder} />
          <PostDetail selectedPost={posts.at(selectedPostId - 1)} />
        </div>
      )}
    </div>
  );
};

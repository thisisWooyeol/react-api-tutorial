import './global.css';

import { useEffect, useState } from 'react';

import { PostDetail } from './PostDetail';
import { PostList } from './PostList';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const fetchPosts = async (baseUrl: string): Promise<Post[]> => {
  const response = await fetch(`${baseUrl}/posts`);
  const data = (await response.json()) as Post[];
  return data;
};

export const App = () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  const [posts, setPosts] = useState<Post[]>();
  const [selectedPostId, setSelectedPost] = useState(1);

  /* fetchPosts */
  useEffect(() => {
    let ignore = false;
    fetchPosts(baseUrl)
      .then((data) => {
        if (!ignore) setPosts(data);
      })
      .catch((error: unknown) => {
        console.error(error);
        alert('데이터를 불러오지 못하였습니다.');
      });
    return () => {
      ignore = true;
    };
  }, [baseUrl]);

  /* handle post selection */
  const onPostClickBuilder = (postId: number) => () => {
    console.debug(`Post clicked: ${postId}`);
    setSelectedPost(postId);
  };

  return (
    <div>
      {posts != null && (
        <PostList posts={posts} onPostClickBuilder={onPostClickBuilder} />
      )}
      <PostDetail baseUrl={baseUrl} selectedPostId={selectedPostId} />
    </div>
  );
};

import './App.css';

import { useEffect, useState } from 'react';

import { PostDetail } from '@/components/PostDetail';
import { PostList } from '@/components/PostList';
import { Separator } from '@/components/ui/separator';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const baseUrl = 'https://jsonplaceholder.typicode.com';

const fetchPosts = async (signal: AbortSignal): Promise<Post[]> => {
  const response = await fetch(`${baseUrl}/posts`, { signal });
  const data = (await response.json()) as Post[];
  return data;
};

export const App = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [selectedPostId, setSelectedPost] = useState<number>();

  /* fetchPosts */
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    let ignore = false;
    fetchPosts(signal)
      .then((data) => {
        if (!ignore) setPosts(data);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          console.debug('Fetch aborted');
          return;
        }
        console.error(error);
        // window.alert(error);
      });
    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  /* handle post selection */
  const onPostClickBuilder = (postId: number) => () => {
    console.debug(`Post clicked: ${postId}`);
    setSelectedPost(postId);
  };

  return (
    <div className="m-2 flex justify-center text-pretty sm:m-10">
      <div className="flex w-full max-w-screen-lg flex-col border border-zinc-300 p-6 sm:flex-row sm:gap-x-4">
        <div className="w-full flex-none sm:w-1/3">
          <PostList posts={posts} onPostClickBuilder={onPostClickBuilder} />
        </div>
        <div className="hidden sm:block">
          <Separator orientation="vertical" className="mx-2" />
        </div>
        <div className="flex-grow">
          <PostDetail
            selectedPost={
              posts?.find((_post: Post) => _post.id === selectedPostId) ??
              posts?.at(0)
            }
          />
        </div>
      </div>
    </div>
  );
};

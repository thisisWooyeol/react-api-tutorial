import { useEffect } from 'react';
import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type PostListProps = {
  baseUrl: string;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const fetchPosts = async (baseUrl: string): Promise<Post[]> => {
  const response = await fetch(`${baseUrl}/posts`);
  const data = (await response.json()) as Post[];
  return data;
};

export const PostList = ({ baseUrl }: PostListProps) => {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    let ignore = false;
    fetchPosts(baseUrl)
      .then((data) => {
        if (!ignore) setPosts(data);
      })
      .catch((error: unknown) => {
        console.error(error);
      });
    return () => {
      ignore = true;
    };
  }, [baseUrl]);

  return (
    <div>
      <h1 className="text-5xl">Post List</h1>
      {posts?.map((post) => (
        <Card key={post.id} className="m-1 hover:opacity-50">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>작성자: {post.userId}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{post.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

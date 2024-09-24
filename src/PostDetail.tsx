import { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type PostDetailProps = {
  baseUrl: string;
  selectedPostId: number;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const fetchPost = async ({
  baseUrl,
  selectedPostId,
}: PostDetailProps): Promise<Post> => {
  const response = await fetch(`${baseUrl}/posts/${selectedPostId}`);
  const data = (await response.json()) as Post;
  return data;
};

const fetchComments = async ({
  baseUrl,
  selectedPostId,
}: PostDetailProps): Promise<Comment[]> => {
  const response = await fetch(`${baseUrl}/posts/${selectedPostId}/comments`);
  const data = (await response.json()) as Comment[];
  return data;
};

export const PostDetail = ({ baseUrl, selectedPostId }: PostDetailProps) => {
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>();

  useEffect(() => {
    let ignore = false;
    fetchPost({ baseUrl, selectedPostId })
      .then((data) => {
        if (!ignore) {
          setSelectedPost(data);
          fetchComments({ baseUrl, selectedPostId })
            .then((_comments) => {
              setComments(_comments);
            })
            .catch((error: unknown) => {
              console.error(error);
            });
        }
      })
      .catch((error: unknown) => {
        console.error(error);
      });
    return () => {
      ignore = true;
    };
  });

  return (
    <>
      <h1 className="text-5xl">Post Detail</h1>
      {selectedPost != null && (
        <Card key={selectedPost.id}>
          <CardHeader>
            <CardTitle>{selectedPost.title}</CardTitle>
            <CardDescription>작성자: {selectedPost.userId}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{selectedPost.body}</p>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">Comments</CardTitle>
          <CardDescription>
            {comments != null ? comments.length : 0}개의 댓글
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            {comments?.map((comment) => (
              <li key={comment.id} className="border-b border-gray-300">
                <h3>{comment.name}</h3>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <button>Load More</button>
        </CardFooter>
      </Card>
    </>
  );
};

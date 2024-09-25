import { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { baseUrl, type Comment, type Post } from './App';

type PostDetailProps = {
  selectedPost: Post | undefined;
};

const fetchComments = async (selectedPostId: number): Promise<Comment[]> => {
  const response = await fetch(`${baseUrl}/posts/${selectedPostId}/comments`);
  const data = (await response.json()) as Comment[];
  return data;
};

export const PostDetail = ({ selectedPost }: PostDetailProps) => {
  const [comments, setComments] = useState<Comment[]>();

  useEffect(() => {
    let ignore = false;
    if (selectedPost != null) {
      fetchComments(selectedPost.id)
        .then((_comments) => {
          if (!ignore) setComments(_comments);
        })
        .catch((error: unknown) => {
          console.error(error);
        });
      return () => {
        ignore = true;
      };
    }
  });

  return (
    <div>
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
              <li key={comment.id} className="border-b p-2 border-gray-300">
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
    </div>
  );
};

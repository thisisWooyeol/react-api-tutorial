import { useEffect, useState } from 'react';

import { baseUrl, type Post } from '@/App';
import { LoadingComments } from '@/components/Loading';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type PostDetailProps = {
  selectedPost: Post | undefined;
};

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
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
          window.alert('데이터를 가져오지 못했습니다.');
        });
      return () => {
        ignore = true;
        setComments(undefined);
      };
    }
  }, [selectedPost]);

  return (
    <div>
      {/** 내용 컴포넌트 */}
      <h1 className="p-6 text-4xl" style={{ fontFamily: 'BMEuljiro' }}>
        내용
      </h1>
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
      {selectedPost == null && <LoadingComments />}
      <Separator />

      {/** 댓글 컴포넌트 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl" style={{ fontFamily: 'BMEuljiro' }}>
            댓글
          </CardTitle>
          <CardDescription>
            {comments != null ? comments.length : 0}개의 댓글
          </CardDescription>
        </CardHeader>

        {/** 로딩중일 땐 Skeleton을 표시 */}
        {comments != null ? (
          <>
            <CardContent>
              <ul>
                {comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="border-b border-zinc-200 py-2"
                  >
                    <h4 className="text-l py-2">작성자: {comment.email}</h4>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="justify-center">
              <button className="rounded bg-zinc-200 px-2 py-1 hover:bg-zinc-400">
                Load More
              </button>
            </CardFooter>
          </>
        ) : (
          <CardContent>
            <LoadingComments />
          </CardContent>
        )}
      </Card>
    </div>
  );
};

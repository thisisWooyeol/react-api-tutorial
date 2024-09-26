import { useEffect, useState } from 'react';

import { baseUrl, type Post } from '@/App';
import { PostComments } from '@/components/PostComments';
import { PostContent } from '@/components/PostContent';
import { Separator } from '@/components/ui/separator';

export type PostDetailProps = {
  selectedPost: Post | undefined;
};
export type Comment = {
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
    }
    return () => {
      ignore = true;
      setComments(undefined);
    };
  }, [selectedPost]);

  return (
    <div>
      <PostContent selectedPost={selectedPost} />
      <Separator />
      <PostComments comments={comments} />
    </div>
  );
};
